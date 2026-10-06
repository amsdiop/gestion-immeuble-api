import React, { useState, useRef } from 'react';
import axios from 'axios';

/**
 * Composant React: PIN Login avec 4 cases séparées et progressbar
 * Usage: <PinLoginComponent />
 */
export const PinLoginComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePinChange = (index: number, value: string) => {
    // Accepter seulement les chiffres
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Dernière entréeuniquement
    setPin(newPin);
    setError('');

    // Auto-focus au prochain input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Si tous les chiffres sont entrés, lancer le login
    if (newPin[3] && newPin.every((digit) => digit)) {
      handleLogin(newPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace: aller au précédent
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleLogin = async (pinArray: string[]) => {
    const pinCode = pinArray.join('');

    if (!email || pinCode.length !== 4) {
      setError('Email et PIN (4 chiffres) requis');
      return;
    }

    setLoading(true);
    setProgress(0);

    // Simuler la progression
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 30;
      });
    }, 200);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login-pin', {
        email,
        pin: pinCode,
      });

      // Compléter à 100%
      clearInterval(progressInterval);
      setProgress(100);

      // Attendre 500ms puis rediriger
      setTimeout(() => {
        const { token, refresh_token, user } = response.data.data;

        // Sauvegarder les tokens
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user', JSON.stringify(user));

        // Rediriger vers le dashboard
        window.location.href = '/dashboard';
      }, 500);
    } catch (err: any) {
      clearInterval(progressInterval);
      setLoading(false);
      setProgress(0);
      setError(err.response?.data?.error || 'Erreur de connexion');
      setPin(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏢 Gestion_Immeuble</h1>
        <p style={styles.subtitle}>Connexion par PIN</p>

        {/* Email input */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="votre@email.com"
            disabled={loading}
            style={styles.emailInput}
          />
        </div>

        {/* PIN inputs (4 cases séparées) */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Code PIN (4 chiffres)</label>
          <div style={styles.pinContainer}>
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={pin[index]}
                onChange={(e) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                placeholder="-"
                disabled={loading || !email}
                style={styles.pinInput}
                inputMode="numeric"
              />
            ))}
          </div>
        </div>

        {/* Progressbar */}
        {loading && (
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
            <p style={styles.progressText}>{Math.round(progress)}%</p>
          </div>
        )}

        {/* Error message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Info message */}
        {!loading && (
          <p style={styles.info}>
            Entrez votre PIN de 4 chiffres. La connexion se fera automatiquement au 4e chiffre.
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  },
  title: {
    margin: '0 0 8px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center' as const,
  },
  subtitle: {
    margin: '0 0 32px',
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center' as const,
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '8px',
  },
  emailInput: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
  },
  pinContainer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  pinInput: {
    width: '60px',
    height: '60px',
    padding: '0',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    fontFamily: 'monospace',
    transition: 'all 0.2s',
    boxSizing: 'border-box' as const,
  },
  progressContainer: {
    marginBottom: '24px',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    transition: 'width 0.3s ease',
  },
  progressText: {
    margin: '0',
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center' as const,
  },
  error: {
    margin: '0 0 16px',
    padding: '12px',
    backgroundColor: '#fee2e2',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#991b1b',
    textAlign: 'center' as const,
  },
  info: {
    margin: '0',
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'center' as const,
    fontStyle: 'italic' as const,
  },
};

export default PinLoginComponent;
