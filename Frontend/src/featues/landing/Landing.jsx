import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import './landing.scss'

const TERMINAL_LINES = [
    { text: '$ analyze --resume resume.pdf --job jd.txt', type: 'cmd' },
    { text: 'reading resume.pdf...', type: 'out' },
    { text: 'extracted skills: React, Node.js, MongoDB', type: 'out' },
    { text: 'parsing job description...', type: 'out' },
    { text: 'match score: 84%', type: 'highlight' },
    { text: 'generating technical questions...', type: 'out' },
    { text: 'generating behavioral questions...', type: 'out' },
    { text: 'building 7-day prep plan...', type: 'out' },
    { text: 'done.', type: 'highlight' },
]

const STEPS = [
    {
        number: '01',
        title: 'Upload your resume & target job',
        description: "Drop in your resume (or just describe yourself) along with the job description you're prepping for.",
    },
    {
        number: '02',
        title: 'AI analyzes the gap',
        description: 'We compare your profile against the role to surface your match score, skill gaps, and likely interview angles.',
    },
    {
        number: '03',
        title: 'Practice with a real plan',
        description: 'Get tailored technical and behavioral questions, model answers, and a day-by-day roadmap to prep with.',
    },
]

const Terminal = () => {
    const [lineCount, setLineCount] = useState(0);

    useEffect(() => {
        let timeoutId;

        if (lineCount < TERMINAL_LINES.length) {
            timeoutId = setTimeout(() => {
                setLineCount((count) => count + 1);
            }, lineCount === 0 ? 500 : 420);
        } else {
            timeoutId = setTimeout(() => {
                setLineCount(0);
            }, 2200);
        }

        return () => clearTimeout(timeoutId);
    }, [lineCount]);

    const visibleLines = TERMINAL_LINES.slice(0, lineCount);

    return (
        <div className="terminal">
            <div className="terminal__bar">
                <span className="terminal__dot terminal__dot--red" />
                <span className="terminal__dot terminal__dot--yellow" />
                <span className="terminal__dot terminal__dot--green" />
                <span className="terminal__label">analysis.sh</span>
            </div>

            <div className="terminal__body">
                {visibleLines.map((line, i) => (
                    <p
                        key={i}
                        className={`terminal__line terminal__line--${line.type}`}
                    >
                        {line.text}
                    </p>
                ))}

                <span className="terminal__cursor" />
            </div>
        </div>
    );
};

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div className='landing-page'>

            {/* Nav */}
            <header className='landing-nav'>
                <div className='landing-nav__brand'>
                    <span className='landing-nav__logo'>IP</span>
                    <span className='landing-nav__title'>Interview Prep</span>
                </div>
                <div className='landing-nav__actions'>
                    <button className='link-button' onClick={() => navigate('/login')}>Log In</button>
                    <button className='button primary-button' onClick={() => navigate('/register')}>Get Started</button>
                </div>
            </header>

            {/* Hero */}
            <section className='hero'>
                <div className='hero__copy'>
                    <span className='hero__eyebrow'>AI-Powered Interview Prep</span>
                    <h1 className='hero__headline'>
                        Walk into every interview <span className='highlight'>already knowing</span> what they'll ask.
                    </h1>
                    <p className='hero__subhead'>
                        Paste your resume and the job description. We'll analyze the gap, generate
                        tailored questions with model answers, and build you a day-by-day prep plan.
                    </p>
                    <div className='hero__actions'>
                        <button className='button primary-button' onClick={() => navigate('/register')}>
                            Get Started — It's Free
                        </button>
                        <button className='link-button link-button--large' onClick={() => navigate('/login')}>
                            Already have an account? Log in →
                        </button>
                    </div>
                </div>
                <div className='hero__visual'>
                    <Terminal />
                </div>
            </section>

            {/* How it works */}
            <section className='how-it-works'>
                <div className='how-it-works__header'>
                    <span className='section-eyebrow'>How It Works</span>
                    <h2>Three steps to walking in prepared</h2>
                </div>
                <div className='steps'>
                    {STEPS.map(step => (
                        <div key={step.number} className='step'>
                            <span className='step__number'>{step.number}</span>
                            <h3 className='step__title'>{step.title}</h3>
                            <p className='step__description'>{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Band */}
            <section className='cta-band'>
                <h2>Your next interview deserves more than guesswork.</h2>
                <button className='button primary-button' onClick={() => navigate('/register')}>
                    Create Your Interview Plan
                </button>
            </section>

            {/* Footer */}
            <footer className='landing-footer'>
                <span className='landing-footer__brand'>Interview Prep</span>
                <div className='landing-footer__links'>
                    <a href='#'>Privacy Policy</a>
                    <a href='#'>Terms of Service</a>
                    <a href='#'>Help Center</a>
                </div>
            </footer>
        </div>
    )
}

export default Landing