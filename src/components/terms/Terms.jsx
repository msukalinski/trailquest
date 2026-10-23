import './Terms.css';

export default function Terms() {
  return (
    <section className="terms-page" aria-labelledby="terms-title">
      <div className="container">
        <div className="terms-content">
          <header className="terms-hero">
            <span className="terms-label">
              <i className="bi bi-file-text" aria-hidden="true" />
              Legal
            </span>

            <h1 id="terms-title">
              Terms of <span>Service</span>
            </h1>

            <p className="terms-intro">
              Simple rules for using TrailQuest. By using the platform,
              you agree to the terms below.
            </p>
          </header>

          <div className="terms-sections">
            <article className="terms-block">
              <h2>1. Using TrailQuest</h2>
              <p>
                TrailQuest is a platform for discovering and sharing hiking
                trails. You may browse trails freely. Creating an account
                lets you save favourites and share your own routes.
              </p>
            </article>

            <article className="terms-block">
              <h2>2. Your Content</h2>
              <p>
                When you share a trail, photo, or other content, you keep
                ownership of it. You give us permission to display it on
                the platform so other users can discover it.
              </p>
            </article>

            <article className="terms-block">
              <h2>3. Respectful Use</h2>
              <p>
                Do not post misleading, harmful, or inappropriate content.
                We may remove content or restrict accounts that violate
                this guideline.
              </p>
            </article>

            <article className="terms-block">
              <h2>4. Trail Information</h2>
              <p>
                Trail details are shared by the community. Conditions can
                change, so always prepare properly and hike responsibly.
                TrailQuest is not responsible for decisions made based on
                information on the platform.
              </p>
            </article>

            <article className="terms-block">
              <h2>5. Accounts</h2>
              <p>
                You are responsible for keeping your account secure.
                You can request account deletion at any time.
              </p>
            </article>

            <article className="terms-block">
              <h2>6. Changes</h2>
              <p>
                We may update these terms when needed. Continued use of
                TrailQuest after changes means you accept the updated terms.
              </p>
            </article>
          </div>

          <p className="terms-updated">
            Last updated: October 2026
          </p>
        </div>
      </div>
    </section>
  );
}