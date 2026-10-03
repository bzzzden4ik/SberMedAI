import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../../shared/api/axios-client.js'

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextRef = useRef(null);

  // 1. Старт записи + инициализация визуализатора
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      // Определяем поддерживаемый MIME-тип
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const finalBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(finalBlob);

        // Останавливаем треки микрофона
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAudioBlob(null);

      // Запуск Canvas-анимации
      setupVisualizer(stream);
    } catch (err) {
      console.error('Ошибка доступа к микрофону:', err);
    }
  };

  // 2. Остановка записи
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  // 3. Отрисовка анимации на Canvas через Web Audio API
  const setupVisualizer = (stream) => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContextClass();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 64; // Размер выборки частот

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / dataArray.length) * 1.5;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;

        ctx.fillStyle = 'rgb(99, 102, 241)';
        ctx.beginPath();
        
        // Фоллбек для старых браузеров без roundRect
        if (ctx.roundRect) {
          ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 4);
        } else {
          ctx.rect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        }
        
        ctx.fill();
        x += barWidth;
      }
    };

    draw();
  };

  // 4. Отправка Blob на бэкенд
  const sendAudio = async () => {
    if (!audioBlob) return;

    setIsUploading(true);
    const formData = new FormData();

    const fileExtension = audioBlob.type.includes('webm') ? 'webm' : 'mp4';
    formData.append('file', audioBlob, `voice_note.${fileExtension}`);

    try {
        const response = await api.post('/upload-audio', {
            body: formData
        })

      if (response.ok) {
        alert('Голосовое успешно отправлено!');
        setAudioBlob(null);
      } else {
        alert('Ошибка при отправке');
      }
    } catch (err) {
      console.error('Ошибка отправки:', err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <canvas
        ref={canvasRef}
        width={100}
        height={100}
        style={{
          background: '#f3f4f6',
          borderRadius: '8px',
          display: isRecording ? 'block' : 'none',
        }}
      />

      {!isRecording ? (
        <button onClick={startRecording}>
          Записать голосовое
        </button>
      ) : (
        <button onClick={stopRecording} style={{ background: '#ef4444', color: '#fff' }}>
          Остановить запись
        </button>
      )}

      {audioBlob && !isRecording && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <audio src={URL.createObjectURL(audioBlob)} controls />
          <button onClick={sendAudio} disabled={isUploading}>
            {isUploading ? 'Отправка...' : 'Отправить на сервер'}
          </button>
        </div>
      )}
    </div>
  );
};