import { useEffect, useMemo, useRef, useState } from 'react'
import { weddingData as data } from './data/weddingData'

const Leaf = ({ className = '' }) => (
  <span className={`leaf ${className}`} aria-hidden="true">❧</span>
)

function WelcomePopup({ onOpen }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const guestName = name.trim()
    if (!guestName) {
      setError('Please enter your name to continue.')
      return
    }
    onOpen(guestName)
  }

  return (
    <div className="welcome-overlay" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div className="welcome-card welcome-card-enter">
        <div className="botanical botanical-top" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="botanical botanical-bottom" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="mini-brand">{data.groomName[0]} <span>♡</span> {data.brideName[0]}</div>
        <p className="eyebrow">A BEAUTIFUL STORY BEGINS</p>
        <h1 id="welcome-title">Welcome</h1>
        <p className="welcome-sub">to our Wedding Celebration</p>
        <div className="ornament"><span />♥<span /></div>
        <p className="welcome-copy">Please enter your name<br />to open the invitation</p>
        <form onSubmit={submit} noValidate>
          <label className="sr-only" htmlFor="guest-name">Your name</label>
          <input id="guest-name" value={name} onChange={(e) => { setName(e.target.value); if (error) setError('') }} placeholder="Your Name" autoComplete="name" autoFocus />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-btn" type="submit">Open Invitation <span aria-hidden="true">→</span></button>
        </form>
        <p className="presence">Your Presence Makes<br />Our Day More Special</p>
      </div>
    </div>
  )
}

function Countdown() {
  const target = useMemo(() => new Date(data.weddingDate).getTime(), [])
  const [left, setLeft] = useState(Math.max(0, target - Date.now()))
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000)
    return () => clearInterval(id)
  }, [target])
  const values = left <= 0 ? [0, 0, 0, 0] : [
    Math.floor(left / 86400000),
    Math.floor(left / 3600000) % 24,
    Math.floor(left / 60000) % 60,
    Math.floor(left / 1000) % 60
  ]
  return (
    <section className="countdown-wrap reveal">
      <div className="countdown-card">
        <Leaf className="corner c1" /><Leaf className="corner c2" />
        <p className="script-title">Counting Down to Our Big Day</p>
        <div className="countdown-grid">{values.map((value, index) => <div key={index}><strong>{String(value).padStart(2, '0')}</strong><span>{['Days', 'Hours', 'Minutes', 'Seconds'][index]}</span></div>)}</div>
        <p className="countdown-note">We can't wait to celebrate with you! <span>♥</span></p>
      </div>
    </section>
  )
}

function WeddingImage({ src, alt, className = '', children }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`image-frame ${className} ${failed ? 'image-fallback' : ''}`}>
      {!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />}
      {failed && children}
    </div>
  )
}

function Gallery({ onOpen }) {
  return (
    <>
      <div className="gallery-grid">
        {data.gallery.map((item, index) => (
          <button className={`gallery-item reveal g${index + 1}`} key={item.id} type="button" onClick={() => onOpen(item)} aria-label={`Open ${item.alt}`}>
            <WeddingImage src={item.image} alt={item.alt}>
              <span>{item.title}</span>
            </WeddingImage>
            <span className="gallery-overlay"><b>{item.title}</b><small>View photo</small></span>
          </button>
        ))}
      </div>
      {/* <p className="gallery-note">Add or remove photos anytime from <code>weddingData.js</code>.</p> */}
    </>
  )
}

function App() {
  const [opened, setOpened] = useState(false)
  const [guest, setGuest] = useState('')
  const [menu, setMenu] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('locked', !opened)
    return () => document.body.classList.remove('locked')
  }, [opened])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [opened])

  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  const open = (name) => {
    setGuest(name)
    setOpened(true)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 80)
  }

  const whatsappLink = useMemo(() => {
    const phone = String(data.whatsappNumber || '').replace(/\D/g, '')
    if (!phone || phone.length < 10 || phone.includes('XXXXXXXX')) return ''
    const message = `${data.whatsappMessage}\n\nFrom: ${guest || 'Wedding Guest'}`
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }, [guest])

  const openWhatsApp = () => {
    if (whatsappLink) window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  const toggleMusic = async () => {
    if (!audioRef.current) return
    try {
      if (musicOn) { audioRef.current.pause(); setMusicOn(false) }
      else { await audioRef.current.play(); setMusicOn(true) }
    } catch { setMusicOn(false) }
  }

  return <>
    <audio ref={audioRef} src={data.musicFile} loop preload="none" />
    {!opened && <WelcomePopup onOpen={open} />}

    <header className="topbar">
      <a className="brand" href="#home" aria-label="Lalit and Usha wedding home">{data.groomName[0]} <span>♡</span> {data.brideName[0]}<small>Two Hearts · One Journey</small></a>
      <button className="menu-btn" onClick={() => setMenu((value) => !value)} aria-label="Toggle menu" aria-expanded={menu}>☰</button>
      <nav className={menu ? 'open' : ''} aria-label="Main navigation">
        {['Home', 'Our Story', 'Events', 'Gallery', 'Venue', 'Message', 'RSVP'].map((item) => <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMenu(false)}>{item}</a>)}
      </nav>
      <button className={`music-btn ${musicOn ? 'active' : ''}`} onClick={toggleMusic} aria-label={musicOn ? 'Pause music' : 'Play music'} aria-pressed={musicOn}>♫</button>
    </header>

    <main>
      <section id="home" className="hero section-shell">
        <div className="hero-copy reveal">
          <p className="eyebrow">WE ARE GETTING MARRIED</p>
          <h1>{data.groomName} <span>♥</span> {data.brideName}</h1>
          <p className="hero-quote">“{data.quote}”</p><div className="divider">❦</div>
          <p className="hero-date">{data.displayDate}</p>
          <p className="guest-line">With love, <b>{guest || 'you'}</b> — you are warmly invited.</p>
          <div className="hero-actions">
            <a className="scroll-cue" href="#our-story">SCROLL TO EXPLORE <span>↓</span></a>
            <button className="whatsapp-btn" type="button" onClick={openWhatsApp} disabled={!whatsappLink} title={!whatsappLink ? 'Add the WhatsApp number in weddingData.js' : 'Open WhatsApp'}>💬 Send Wedding Wishes</button>
          </div>
        </div>
        <div className="hero-photo reveal">
          <WeddingImage src={data.heroImage} alt={`${data.groomName} and ${data.brideName}`}><span>Our<br />Wedding<br />Photo</span></WeddingImage>
          <span className="photo-caption">Together · Forever</span>
        </div>
      </section>

      <Countdown />

      <section id="our-story" className="section-shell story-section">
        <div className="section-heading reveal"><p className="script-title">Our Story</p><p>EVERY LOVE STORY IS BEAUTIFUL · BUT OURS IS OUR FAVOURITE</p></div>
        <div className="story-intro reveal"><span className="story-intro-line" /><p>From a first meeting to a forever promise, every chapter brought us closer.</p><span className="story-intro-line" /></div>
        <div className="story-couple">
          <article className="story-person reveal"><WeddingImage src={data.groomImage} alt={data.groomName} className="portrait-image"><span>{data.groomName}</span></WeddingImage><h3>{data.groomName}</h3><p>A heart that found its forever.</p></article>
          <div className="story-center"><span className="story-center-mark">L <b>♡</b> U</span><span className="story-center-caption">A beautiful journey of two hearts</span></div>
          <article className="story-person reveal"><WeddingImage src={data.brideImage} alt={data.brideName} className="portrait-image"><span>{data.brideName}</span></WeddingImage><h3>{data.brideName}</h3><p>A soul that believed in true love.</p></article>
        </div>
        <div className="story-timeline story-timeline-premium">
          <div className="story-line" aria-hidden="true" />
          {data.story.map((story, index) => (
            <article className={`story-event story-event-premium ${index % 2 === 0 ? 'left' : 'right'} reveal`} key={`${story.year}-${story.title}`}>
              <span className="story-event-dot" aria-hidden="true">{index === data.story.length - 1 ? '♥' : '♡'}</span>
              <div className="story-event-content">
                <div className="story-event-photo">
                  <WeddingImage src={story.image} alt={`${story.title} — Lalit and Usha`}>
                    <span>{story.title}</span>
                  </WeddingImage>
                </div>
                <div className="story-event-copy">
                  <span className="story-year">CHAPTER {String(index + 1).padStart(2, '0')} · {story.year}</span>
                  <h3>{story.title}</h3>
                  <p>{story.text}</p>
                  <span className="story-event-flourish">L <b>♡</b> U</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className="section-shell events-section">
        <div className="section-heading reveal"><p className="script-title">Wedding Events</p><p>JOIN US IN CELEBRATING OUR SPECIAL MOMENTS</p></div>
        <div className="event-grid">{data.events.map((event, index) => { const location = data.locations[event.locationKey]; return <article className="event-card reveal" key={`${event.title}-${event.date}`}><div className="event-icon">{['◌', '✽', '➜', '♢'][index]}</div><h3>{event.title}</h3><strong>{event.date}</strong><span>{event.time}</span><p>{event.venue}</p>{location?.address && <small className="event-location">📍 {location.address}</small>}{location?.mapUrl && <a className="event-map-link" href={location.mapUrl} target="_blank" rel="noreferrer">Open Location →</a>}</article> })}</div>
      </section>

      <section id="gallery" className="section-shell gallery-section">
        <div className="section-heading reveal"><p className="script-title">Our Memories</p><p>A FEW BEAUTIFUL MOMENTS</p></div>
        <Gallery onOpen={setLightbox} />
      </section>

      <section id="venue" className="section-shell venue-section">
        <div className="section-heading reveal">
          <p className="script-title">Our Locations</p>
          <p>EVERY MILESTONE, EVERY PLACE, ONE BEAUTIFUL JOURNEY</p>
        </div>
        <div className="location-grid">{Object.values(data.locations).map((location) => <article className="location-card reveal" key={location.label}><span className="location-pin">⌖</span><p className="location-label">{location.label}</p><h2>{location.name}</h2><p>{location.address}</p>{location.mapUrl ? <a className="primary-btn inline" href={location.mapUrl} target="_blank" rel="noreferrer">📍 Open in Google Maps →</a> : <span className="map-coming">Location link will be added</span>}</article>)}</div>
      </section>

      <section id="message" className="message-section">
        <div className="section-shell message-card reveal">
          <p className="script-title">Warm Wishes</p>
          <p>Your presence will make our celebration more special.<br />
          We would be honoured to have you with us on our big day.</p>
          <div className="ornament">
            <span />♥<span />
            </div>
            <p>With the blessings of</p>
            {data.family.map((family) => <strong key={family}>{family}</strong>)}
            </div>
            </section>
      <section id="rsvp" className="rsvp-section">
        <div className="section-shell reveal">
          <p className="script-title">RSVP</p>
          <p>We would love to celebrate these precious moments with you.</p>
          <button className="primary-btn inline" type="button" onClick={openWhatsApp} 
          disabled={!whatsappLink}>💬 Send your wishes on WhatsApp →</button>
          <small className="rsvp-note">Your wedding wishes message will open in WhatsApp. Review it and tap Send.</small>
          </div>
          </section>
      <footer>
        <div className="script-title">Thank You</div>
      <p>FOR BEING A PART OF OUR JOURNEY</p>
      <h2>{data.groomName} <span>♥</span> {data.brideName}</h2>
      <small>Made with ♡ for a lifetime of happiness</small></footer>
    </main>

    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Wedding photo viewer" onClick={() => setLightbox(null)}><button className="lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close">×</button><img src={lightbox.image} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} /><p>{lightbox.title}</p></div>}
  </>
}

export default App
