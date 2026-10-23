import './Privacy.css';

export default function Privacy() {
  return (
    <section className="privacy-page" aria-labelledby="privacy-title">
      <div className="container">
        <div className="privacy-content">
          <header className="privacy-hero">
            <span className="privacy-label">
              <i className="bi bi-shield-check" aria-hidden="true" />
              Legal
            </span>

            <h1 id="privacy-title">
              Privacy <span>Policy</span>
            </h1>

            <p className="privacy-intro">
              How we protect your data at TrailQuest. Your trust is important 
              to us, and we keep things simple.
            </p>
          </header>

          <div className="privacy-sections">
            <article className="privacy-block">
              <h2>1. Information We Collect</h2>
              <p>
                We collect your email address and username when you create an account. 
                If you choose to share trails, routes, or photos, that content is 
                stored safely on our platform.
              </p>
            </article>

            <article className="privacy-block">
              <h2>2. How We Use Data</h2>
              <p>
                Your information is used solely to provide and improve TrailQuest. 
                We use it to manage your account, display your shared content, and 
                personalize your saved favourites.
              </p>
            </article>

            <article className="privacy-block">
              <h2>3. Data Sharing</h2>
              <p>
                We do not sell your personal information. Your shared trails and 
                public profile details are visible to the community so other hikers 
                can discover them.
              </p>
            </article>

            <article className="privacy-block">
              <h2>4. Security & Storage</h2>
              <p>
                We use secure industry-standard measures to safeguard your personal data. 
                While no system is completely immune, we work continuously to keep 
                your account data safe.
              </p>
            </article>

            <article className="privacy-block">
              <h2>5. Your Rights</h2>
              <p>
                You control your information. You can edit your profile details or 
                request permanent account and data deletion through your settings at 
                any time.
              </p>
            </article>

            <article className="privacy-block">
              <h2>6. Policy Updates</h2>
              <p>
                We may periodically update this policy to reflect platform adjustments. 
                We will update the date below whenever changes are published.
              </p>
            </article>
          </div>

          <p className="privacy-updated">
            Last updated: October 2026
          </p>
        </div>
      </div>
    </section>
  );
}