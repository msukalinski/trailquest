import './Help.css'

export default function Help() {
    return (
        <section className="help-page" aria-labelledby="help-title">
            <div className="container">
                <div className="help-content">
                    <header className="help-hero">
                        <span className="help-label">
                            <i className="bi bi-question-circle-fill" aria-hidden="true" />
                            Support
                        </span>

                        <h1 id="help-title">
                            Help & <span>FAQ</span>
                        </h1>

                        <p className="help-intro">
                            Find quick answers to common questions about TrailQuest,
                            managing your account, and sharing routes.
                        </p>
                    </header>

                    <div className="help-sections">
                        <article className="help-block">
                            <h2>How do I create and share a new hiking trail?</h2>
                            <p>
                                Log into your account, navigate to the map dashboard, and select
                                "Create Route." You can trace your path, add photos, and write a
                                description before publishing it to the community.
                            </p>
                        </article>

                        <article className="help-block">
                            <h2>Is TrailQuest free to use?</h2>
                            <p>
                                Yes! Discovering trails, downloading route files, and sharing your
                                hiking experiences with the community is completely free.
                            </p>
                        </article>

                        <article className="help-block">
                            <h2>Can I use TrailQuest maps offline?</h2>
                            <p>
                                Account holders can save trails to their offline list via our
                                mobile view. We always recommend downloading a backup GPS map
                                before heading out into remote locations.
                            </p>
                        </article>

                        <article className="help-block">
                            <h2>How do I report incorrect trail details or issues?</h2>
                            <p>
                                On every trail page, there is a "Report Route" button. Use this
                                to flag overgrown trails, seasonal closures, or misleading markers
                                for our moderation team.
                            </p>
                        </article>

                        <article className="help-block">
                            <h2>How do I permanently delete my account?</h2>
                            <p>
                                Go to your Profile Settings, scroll to the bottom, and click
                                "Delete Account." This will permanently erase your personal data
                                and profile history.
                            </p>
                        </article>
                    </div>

                    <p className="help-footer">
                        Still need help? Contact us at <a href="mailto:support@trailquest.com">support@trailquest.com</a>
                    </p>
                </div>
            </div>
        </section>
    );
}