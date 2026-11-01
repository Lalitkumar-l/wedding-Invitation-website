export const weddingData = {
  groomName: 'Lalit',
  brideName: 'Usha',

  // Main wedding day
  weddingDate: '2026-11-22T19:00:00+05:30',
  displayDate: '20 – 22 November 2026',
  quote: 'Two hearts, one journey, a lifetime of love.',

  // Images
  heroImage: './images/hero-couple.png',
  groomImage: './images/Lalit.png',
  brideImage: './images/Usha.png',
  musicFile: './music/wedding.mp3',

  // Exactly 3 gallery photos
  gallery: [
    {
      id: 'g1',
      title: 'Together',
      alt: 'Lalit and Usha together',
      image: './images/gallery-1.png'
    },
    {
      id: 'g2',
      title: 'Beautiful Moments',
      alt: 'Wedding memory',
      image: './images/gallery-2.png'
    },
    {
      id: 'g3',
      title: 'Our Smile',
      alt: 'Couple portrait',
      image: './images/gallery-3.png'
    }
  ],

  // WhatsApp configuration
  whatsappNumber: '916397908139',

  whatsappMessage: `Namaste Lalit & Usha!

Congratulations on your wedding!

Wishing you both a lifetime of love, happiness, understanding and togetherness.

May God bless your beautiful journey together.

Best wishes!`,

  // Our Story
  story: [
    {
      year: '2019',
      title: 'First Meet',
      text: 'A beautiful beginning.',
      image: './images/story-first-meet.png'
    },
    {
      year: '2021',
      title: 'Friendship',
      text: 'Two lives, one growing bond.',
      image: './images/story-friendship.png'
    },
    {
      year: '2022',
      title: 'Together',
      text: 'Choosing each other every day.',
      image: './images/story-together.png'
    },
    {
      year: '2026',
      title: 'Engagement',
      text: 'One step closer to forever.',
      image: './images/story-engagement.png'
    },
    {
      year: '2026',
      title: 'Wedding',
      text: 'Forever starts here.',
      image: './images/story-wedding.png'
    }
  ],

  // Wedding Events
  events: [
    {
      title: 'Haldi Ceremony',
      date: '20 NOVEMBER 2026',
      time: '02:00 PM',
      venue: 'Our Residence',
      locationKey: 'home'
    },
    {
      title: 'Bhojan / Mandap',
      date: '21 NOVEMBER 2026',
      time: '05:00 PM',
      venue: 'Our Village',
      locationKey: 'village'
    },
    {
      title: 'Baraat Prasthan',
      date: '22 NOVEMBER 2026',
      time: '07:00 PM',
      venue: 'SATPURA MAFI TO SEVAR',
      locationKey: 'village',

      mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=SATPURA+MAFI+NEAR+BILRAM+KASGANJ+UTTAR+PRADESH+207124&destination=SEVAR+POST+MAHAWAR+207124&travelmode=driving'
    },
    {
      title: 'Wedding Ceremony',
      date: '22 NOVEMBER 2026',
      time: '08:00 PM',
      venue: 'Bride’s Place',
      locationKey: 'bride'
    }
  ],

  // Wedding Locations
  locations: {
    home: {
      label: 'Haldi Ceremony',
      name: 'Lalit’s Family Home',

      address: 'SATPURA MAFI, NEAR BILRAM, KASGANJ, UTTAR PRADESH – 207124',

      mapUrl: 'https://www.google.com/maps/place/Lalit+Kumar/@27.8121974,78.5587798,354m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3974e77b0562d8df:0xb2148fc8f6db1f53!8m2!3d27.812195!4d78.5600673!16s%2Fg%2F11pr23dv99?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D'
    },

    village: {
      label: 'Bhojan / Mandap',
      name: 'Our Village',

      address: 'SATPURA MAFI, NEAR BILRAM, KASGANJ, UTTAR PRADESH – 207124',

      mapUrl: 'https://www.google.com/maps/place/Lalit+Kumar/@27.8121974,78.5587798,354m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3974e77b0562d8df:0xb2148fc8f6db1f53!8m2!3d27.812195!4d78.5600673!16s%2Fg%2F11pr23dv99?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D'
    },

    bride: {
      label: 'Wedding Ceremony',
      name: 'Usha’s Place',

      address: 'SEVAR, POST MAHAWAR – 207124',

      mapUrl: 'https://www.google.com/maps/search/sewar+mahawar/@27.8489822,78.5946627,158m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D'
    }
  },

  // Family Members
  family: [
    'Mr. VEERENDRA SINGH',
    'Mrs. KAILASHI DEVI',
    'Mr. SHIVRAM SINGH'
  ]
}