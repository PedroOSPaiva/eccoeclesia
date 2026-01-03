function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-card">
        <div className="splash-pixel-art" aria-hidden="true">
          <svg viewBox="0 0 16 16" role="img">
            <rect width="16" height="16" fill="#0f172a" />
            <rect x="7" y="1" width="2" height="2" fill="#22c55e" />
            <rect x="6" y="3" width="4" height="2" fill="#22c55e" />
            <rect x="5" y="5" width="6" height="2" fill="#22c55e" />
            <rect x="4" y="7" width="8" height="2" fill="#16a34a" />
            <rect x="3" y="9" width="10" height="2" fill="#16a34a" />
            <rect x="7" y="11" width="2" height="4" fill="#a16207" />
          </svg>
        </div>
        <h1>EcoEcclesia</h1>
        <p>Projeto criado por Pedro Henrique Oliveira Souza Paiva.</p>
        <p>Desenvolvido e idealizado na comunidade São João Bosco,</p>
        <p>na Paróquia da Imaculada Conceição.</p>
      </div>
    </div>
  );
}

export default SplashScreen;
