import { useState, useEffect, useRef } from 'react'
import { 
  User, Mail, Phone, MapPin, Send, Target, Eye, 
  BookOpen, Users, Leaf, Heart, GraduationCap, 
  Handshake, Calendar, Check, ChevronLeft, ChevronRight,
  Sparkles, Award, Clock, ArrowRight
} from 'lucide-react'
import { translations } from './translations'

// Custom Facebook icon component to avoid dependency errors
function Facebook(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

// Asset imports
import amdejLogo from './assets/amdej_logo.png'
import heroYouth from './assets/hero_youth.png'
import handsStacked from './assets/hands_stacked.png'
import youthCircle from './assets/youth_circle.png'
import trainingWorkshop from './assets/training_workshop.png'
import volunteerProgram from './assets/volunteer_program.png'

// Unsplash backup images for the missing generated assets
const educationalSupportImg = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
const eventsCampaignsImg = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80"

// Counter component for animated statistics
function AnimatedCounter({ target, text, duration = 2000, icon: Icon }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)

  useEffect(() => {
    let start = 0
    // Parse target to extract number (e.g. "+500" -> 500, "1" -> 1)
    const isPlus = target.startsWith('+')
    const end = parseInt(target.replace('+', ''), 10)
    
    if (isNaN(end)) return

    const totalSteps = 50
    const stepTime = Math.max(Math.floor(duration / totalSteps), 10)
    const increment = Math.ceil(end / totalSteps)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [target, duration])

  return (
    <div ref={countRef} className="flex flex-col items-center p-6 text-center transform transition duration-500 hover:scale-105">
      <div className="bg-white/10 p-4 rounded-full mb-4 text-emerald-300">
        <Icon className="w-8 h-8" />
      </div>
      <span className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
        {target.startsWith('+') ? `+${count}` : count}
      </span>
      <span className="text-emerald-100 text-sm lg:text-base font-medium opacity-90">{text}</span>
    </div>
  )
}

function App() {
  const [lang, setLang] = useState('fr')
  const [activeSlide, setActiveSlide] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const t = translations[lang]
  const isRtl = lang === 'ar'

  // Activities list with local assets and backup URLs
  const activityItems = [
    { 
      title: t.activities.items[0].title, 
      desc: t.activities.items[0].desc, 
      img: trainingWorkshop, 
      icon: GraduationCap 
    },
    { 
      title: t.activities.items[1].title, 
      desc: t.activities.items[1].desc, 
      img: volunteerProgram, 
      icon: Users 
    },
    { 
      title: t.activities.items[2].title, 
      desc: t.activities.items[2].desc, 
      img: educationalSupportImg, 
      icon: BookOpen 
    },
    { 
      title: t.activities.items[3].title, 
      desc: t.activities.items[3].desc, 
      img: eventsCampaignsImg, 
      icon: Calendar 
    }
  ]

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % activityItems.length)
  }

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + activityItems.length) % activityItems.length)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Simulated submission
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 4000)
  }

  return (
    <div className={`min-h-screen flex flex-col ${t.font} ${isRtl ? 'rtl' : 'ltr'} bg-brand-softbg selection:bg-brand-green selection:text-white`}>
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none">
            <img 
              src={amdejLogo} 
              alt="AMDEJ Logo" 
              className="h-14 w-14 object-contain transition-transform duration-300 group-hover:rotate-6"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-brand-teal tracking-wide leading-tight group-hover:text-brand-green transition-colors duration-300">
                AMDEJ
              </span>
              <span className="text-[10px] text-gray-500 font-medium hidden sm:inline-block uppercase tracking-wider">
                Association Almoustakbal
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-medium">
            <a href="#home" className="text-gray-600 hover:text-brand-green transition-colors duration-200 py-2">{t.nav.home}</a>
            <a href="#about" className="text-gray-600 hover:text-brand-green transition-colors duration-200 py-2">{t.nav.about}</a>
            <a href="#objectives" className="text-gray-600 hover:text-brand-green transition-colors duration-200 py-2">{t.nav.activities}</a>
            <a href="#projects" className="text-gray-600 hover:text-brand-green transition-colors duration-200 py-2">{t.nav.projects}</a>
            <a href="#join" className="text-gray-600 hover:text-brand-green transition-colors duration-200 py-2">{t.nav.join}</a>
            <a href="#contact" className="text-gray-600 hover:text-brand-green transition-colors duration-200 py-2">{t.nav.contact}</a>
          </nav>

          {/* Language Selector */}
          <div className="flex items-center gap-2 border-l border-gray-200 pl-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4">
            <button 
              onClick={() => setLang('ar')} 
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${
                lang === 'ar' 
                  ? 'bg-brand-green text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-brand-green'
              }`}
            >
              العربية
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => setLang('fr')} 
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 ${
                lang === 'fr' 
                  ? 'bg-brand-green text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-brand-green'
              }`}
            >
              Français
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-b from-brand-lightgreen/50 to-white overflow-hidden py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left/Right Text Column */}
            <div className={`lg:col-span-6 flex flex-col justify-center text-center lg:text-left rtl:lg:text-right`}>
              <h1 className="text-5xl lg:text-6xl font-black text-brand-teal tracking-tight leading-none mb-4">
                {t.hero.title}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-bold text-brand-green mb-6 leading-tight">
                {t.hero.subtitle}
              </h2>
              
              {/* Tagline */}
              <div className="inline-block bg-brand-lightgreen/70 border border-brand-green/20 px-4 py-2 rounded-full self-center lg:self-start mb-6">
                <span className="text-brand-darkgreen font-semibold text-base block rtl:hidden">
                  {t.hero.taglineFr}
                </span>
                <span className="text-brand-darkgreen font-semibold text-lg hidden rtl:block">
                  {t.hero.taglineAr}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {t.hero.desc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#join" 
                  className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-darkgreen text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Users className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>{t.hero.btnJoin}</span>
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-brand-lightgreen border-2 border-brand-green text-brand-green hover:text-brand-darkgreen font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span>{t.hero.btnContact}</span>
                </a>
              </div>
            </div>

            {/* Right/Left Image Column */}
            <div className="lg:col-span-6 relative flex justify-center">
              {/* Background abstract decorations */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-100 rounded-full blur-2xl opacity-60"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white max-w-md md:max-w-lg transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src={heroYouth} 
                  alt="AMDEJ Youth Team" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Waves SVG Bottom Separator */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Qui sommes-nous ? Section */}
      <section id="about" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side Collage images */}
            <div className="lg:col-span-6 relative flex flex-col gap-6">
              
              {/* Stacked Hands (Main Card) */}
              <div className="relative self-center lg:self-start w-full max-w-md z-10">
                <img 
                  src={handsStacked} 
                  alt="Stacked Hands" 
                  className="rounded-3xl shadow-xl w-full h-64 object-cover border-4 border-white"
                />
                {/* Floating overlay card */}
                <div className={`absolute bottom-4 right-4 rtl:left-4 rtl:right-auto bg-gradient-to-r from-brand-green to-emerald-600 text-white p-4 rounded-2xl shadow-xl max-w-xs flex items-center gap-3 border border-white/20 transform hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">AMDEJ</p>
                    <p className="text-sm font-bold">{t.about.badgeText}</p>
                  </div>
                </div>
              </div>

              {/* Group in Circle (Overlapping Card) */}
              <div className="relative self-center lg:self-end w-full max-w-md -mt-12 lg:-mt-20 lg:mr-8 rtl:lg:mr-0 rtl:lg:ml-8 z-20">
                <img 
                  src={youthCircle} 
                  alt="Youth sitting in a circle" 
                  className="rounded-3xl shadow-xl w-full h-60 object-cover border-4 border-white"
                />
              </div>

              {/* Dot matrix element */}
              <div className="absolute top-0 right-0 -mr-6 -mt-6 hidden md:block opacity-20">
                <div className="grid grid-cols-6 gap-2">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-brand-green rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side Text column */}
            <div className="lg:col-span-6">
              <span className="text-brand-green font-extrabold text-sm tracking-wider uppercase bg-brand-lightgreen px-3 py-1 rounded-full">
                {t.about.tag}
              </span>
              <h2 className="text-4xl font-extrabold text-brand-teal mt-4 mb-6 leading-tight">
                {t.about.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {t.about.desc}
              </p>

              {/* Mission & Vision grid */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Mission */}
                <div className="bg-brand-softbg p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-brand-green/20">
                  <div className="bg-brand-lightgreen text-brand-green p-3 rounded-xl inline-block mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-teal mb-2">{t.about.missionTitle}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.about.missionDesc}</p>
                </div>

                {/* Vision */}
                <div className="bg-brand-softbg p-6 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-brand-green/20">
                  <div className="bg-brand-lightgreen text-brand-green p-3 rounded-xl inline-block mb-4">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-teal mb-2">{t.about.visionTitle}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.about.visionDesc}</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ce que nous visons (Objectives) Section */}
      <section id="objectives" className="py-20 bg-brand-softbg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-green font-extrabold text-sm tracking-wider uppercase bg-brand-lightgreen px-3 py-1 rounded-full">
            {t.objectives.tag}
          </span>
          <h2 className="text-4xl font-extrabold text-brand-teal mt-4 mb-4">
            {t.objectives.title}
          </h2>
          
          {/* Triple Green Underlines */}
          <div className="flex justify-center gap-1.5 mb-12">
            <span className="w-10 h-1 bg-brand-green rounded-full"></span>
            <span className="w-16 h-1 bg-brand-green rounded-full"></span>
            <span className="w-10 h-1 bg-brand-green rounded-full"></span>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {t.objectives.items.map((obj, i) => {
              const icons = [BookOpen, Users, Leaf, Heart]
              const Icon = icons[i]
              return (
                <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-brand-green/20 group">
                  <div className="bg-brand-lightgreen text-brand-green p-4 rounded-2xl inline-block mb-6 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-teal mb-4">{obj.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{obj.desc}</p>
                </div>
              )
            })}

          </div>
        </div>
      </section>

      {/* Nos Projets & Actions (Activities Carousel) Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-green font-extrabold text-sm tracking-wider uppercase bg-brand-lightgreen px-3 py-1 rounded-full">
            {t.activities.tag}
          </span>
          <h2 className="text-4xl font-extrabold text-brand-teal mt-4 mb-12">
            {t.activities.title}
          </h2>

          {/* Desktop/Tablet Grid & Mobile Slider */}
          <div className="relative">
            
            {/* Arrows */}
            <button 
              onClick={handlePrevSlide} 
              className={`absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 bg-white hover:bg-brand-lightgreen text-brand-teal p-3 rounded-full border border-gray-200 shadow-md transition-all duration-200 z-30 focus:outline-none`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNextSlide} 
              className={`absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 bg-white hover:bg-brand-lightgreen text-brand-teal p-3 rounded-full border border-gray-200 shadow-md transition-all duration-200 z-30 focus:outline-none`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slider Container */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
              
              {/* Show items based on active index (cyclic display on mobile, show all on large screen with highlighted item) */}
              {activityItems.map((item, index) => {
                const CardIcon = item.icon
                // Desktop: show all. Mobile: show only the activeSlide.
                return (
                  <div 
                    key={index} 
                    className={`bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-green/20 ${
                      activeSlide === index ? 'ring-2 ring-brand-green scale-[1.01]' : 'opacity-90 sm:opacity-100'
                    } flex flex-col`}
                  >
                    
                    {/* Image block */}
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Icon circular overlay */}
                    <div className="relative flex justify-center -mt-8 z-10">
                      <div className="bg-brand-green text-white p-3 rounded-full border-4 border-white shadow-md">
                        <CardIcon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 pt-4 flex-grow flex flex-col justify-between">
                      <h3 className="text-lg font-bold text-brand-teal mb-3">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>

                  </div>
                )
              })}

            </div>

            {/* Carousel Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {activityItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    activeSlide === index ? 'bg-brand-green w-7' : 'bg-gray-200 hover:bg-brand-lightgreen'
                  }`}
                ></button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Banner Section */}
      <section className="relative py-16 bg-gradient-to-r from-brand-teal to-brand-darkteal text-white overflow-hidden">
        {/* Background photo overlay */}
        <div className="absolute inset-0 opacity-10 bg-center bg-cover mix-blend-overlay" style={{ backgroundImage: `url(${heroYouth})` }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedCounter target="+500" text={t.stats.accompanied} icon={GraduationCap} />
            <AnimatedCounter target="+50" text={t.stats.completed} icon={Award} />
            <AnimatedCounter target="+30" text={t.stats.partners} icon={Handshake} />
            <AnimatedCounter target="1" text={t.stats.mission} icon={MapPin} />
          </div>
        </div>
      </section>

      {/* Contact & Join Split Forms Section */}
      <section id="join" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left side: Join Form */}
            <div className="lg:col-span-7 bg-brand-softbg p-8 lg:p-12 rounded-3xl border border-gray-100 shadow-lg">
              <span className="text-brand-green font-extrabold text-sm tracking-wider uppercase bg-brand-lightgreen px-3 py-1 rounded-full">
                {t.joinForm.tag}
              </span>
              <h2 className="text-3xl font-extrabold text-brand-teal mt-4 mb-8">
                {t.joinForm.title}
              </h2>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-brand-darkgreen p-6 rounded-2xl text-center shadow-inner animate-pulse-slow">
                  <Sparkles className="w-12 h-12 text-brand-green mx-auto mb-3" />
                  <h3 className="text-lg font-bold mb-2">Merci pour votre intérêt !</h3>
                  <p className="text-sm">Votre message a été envoyé avec succès. Nous vous contacterons très prochainement.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Name field */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.joinForm.name}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-brand-green focus:ring-2 focus:ring-brand-lightgreen outline-none transition duration-200 text-gray-700" 
                        placeholder={t.joinForm.name}
                      />
                    </div>
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.joinForm.email}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-brand-green focus:ring-2 focus:ring-brand-lightgreen outline-none transition duration-200 text-gray-700" 
                          placeholder={t.joinForm.email}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{t.joinForm.phone}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                          <Phone className="w-5 h-5" />
                        </div>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-brand-green focus:ring-2 focus:ring-brand-lightgreen outline-none transition duration-200 text-gray-700" 
                          placeholder={t.joinForm.phone}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Why Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.joinForm.why}</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows="4"
                      required
                      className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:border-brand-green focus:ring-2 focus:ring-brand-lightgreen outline-none transition duration-200 text-gray-700 resize-none" 
                      placeholder={t.joinForm.why}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-darkgreen text-white font-bold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
                  >
                    <Send className="w-5 h-5" />
                    <span>{t.joinForm.send}</span>
                  </button>

                </form>
              )}
            </div>

            {/* Right side: Contact Details */}
            <div id="contact" className="lg:col-span-5 flex flex-col gap-10">
              
              <div>
                <span className="text-brand-green font-extrabold text-sm tracking-wider uppercase bg-brand-lightgreen px-3 py-1 rounded-full">
                  {t.contactInfo.tag}
                </span>
                <h2 className="text-3xl font-extrabold text-brand-teal mt-4 mb-8">
                  {t.contactInfo.title}
                </h2>
                
                {/* Contact List */}
                <div className="space-y-6">
                  
                  {/* Phone */}
                  <a href={`tel:${t.contactInfo.phone}`} className="flex items-center gap-4 group p-3 -m-3 rounded-2xl hover:bg-brand-lightgreen transition duration-200">
                    <div className="bg-brand-lightgreen text-brand-green p-3 rounded-xl group-hover:bg-brand-green group-hover:text-white transition duration-200">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t.joinForm.phone}</p>
                      <p className="text-base font-bold text-brand-teal group-hover:text-brand-green transition duration-200">{t.contactInfo.phone}</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a href={`mailto:${t.contactInfo.email}`} className="flex items-center gap-4 group p-3 -m-3 rounded-2xl hover:bg-brand-lightgreen transition duration-200">
                    <div className="bg-brand-lightgreen text-brand-green p-3 rounded-xl group-hover:bg-brand-green group-hover:text-white transition duration-200">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t.joinForm.email}</p>
                      <p className="text-base font-bold text-brand-teal group-hover:text-brand-green transition duration-200">{t.contactInfo.email}</p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-center gap-4 p-3 -m-3 rounded-2xl">
                    <div className="bg-brand-lightgreen text-brand-green p-3 rounded-xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Adresse</p>
                      <p className="text-base font-bold text-brand-teal">{t.contactInfo.address}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Social Follow Us */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  {t.contactInfo.followUs}
                </h3>
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-brand-lightgreen text-brand-green hover:bg-brand-green hover:text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Large AMDEJ Brand Card */}
              <div className="bg-brand-lightgreen/50 border border-brand-green/10 p-6 rounded-3xl flex items-center gap-4">
                <img 
                  src={amdejLogo} 
                  alt="AMDEJ Logo" 
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <h4 className="text-lg font-bold text-brand-teal">AMDEJ</h4>
                  <p className="text-xs text-gray-500 font-semibold mb-2">{t.hero.subtitle}</p>
                  <p className="text-[11px] text-brand-darkgreen font-bold italic">
                    {lang === 'ar' ? t.hero.taglineAr : t.hero.taglineFr}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-darkteal text-white/95 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          {/* Rights */}
          <span className="text-sm text-gray-400 font-medium">
            {t.footer.rights}
          </span>

          {/* Tagline/Quote */}
          <div className="flex items-center gap-2 text-sm text-emerald-300 font-bold italic">
            <span>{t.footer.quote}</span>
            <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" />
          </div>

        </div>
      </footer>

      {/* ------------------------------------------------------------- */}


    </div>
  )
}

export default App
