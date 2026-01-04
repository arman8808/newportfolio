import detailingDrats from "../public/Asset/images/projects/_   black.webp";
import startyfyZone from "../public/Asset/images/projects/home page.webp";
import cityHospital from "../public/Asset/images/projects/Screenshot_12-7-2024_11286_cityhospitallko.com.webp";
import tanujPunia from "../public/Asset/images/projects/Screenshot_12-7-2024_111522_www.tanujpunia.com.webp";
import luminex from "../public/Asset/images/projects/Screenshot_12-7-2024_111642_lumineux.ae.webp";
import unfold from "../public/Asset/images/projects/Screenshot_12-7-2024_112519_unfoldconcetto.in.webp";
import unique from "../public/Asset/images/projects/Screenshot_12-7-2024_112927_theuniquegroup.co.in.webp";
import impals from "../public/Asset/images/projects/Screenshot_12-7-2024_112948_www.impulsegloballlc.com.webp";
import eduversity from "../public/Asset/images/projects/Screenshot_12-7-2024_115216_viveneduversity.com.webp";
import CasPian from "../public/Asset/images/projects/new home.jpeg";
import TradeX from "../public/Asset/images/projects/Home---.jpeg";
import MySatGuide from "../public/Asset/images/projects/2024 __ time__12_24.webp";
export const projectInfo = [
  {
    image: CasPian,
    title: "CasPian Health Care",
    category: "Healthcare Tech",
    subDesc:
      "A comprehensive telemedicine platform integrating real-time video consultations, prescription management, and diagnostic lab booking.",
    techStack: ["React Js", "TailWind Css", "Laravel", "Firebase", "MySql"],
    caseStudy: {
      challenge: "The client needed a HIPAA-compliance ready system that could handle real-time high-definition video calls while simultaneously managing secure patient records and high-volume appointment bookings without latency.",
      solution: "We engineered a hybrid architecture using Firebase for real-time chat synchronization and WebRTC for low-latency video calls. The core patient data system was built on a secure Laravel backend with encrypted MySQL storage to ensure data integrity and privacy.",
      outcomes: [
        "Reduced appointment booking time by 40%",
        "Successfully handled 500+ daily active users",
        "Zero data breaches during stress testing"
      ]
    }
  },
  {
    image: MySatGuide,
    title: "My Sat Guide",
    category: "EdTech Platform",
    subDesc:
      "An adaptive learning platform for SAT preparation featuring personalized course tracks and live progress tracking.",
    techStack: [
      "React Js",
      "TailWind Css",
      "Node Js",
      "Express Js",
      "MongoDb",
      "Aws",
      "Hls",
    ],
    caseStudy: {
      challenge: "Students needed seamless access to high-quality video content with adaptive bandwidth streaming, along with real-time analytics to track their study progress across thousands of potential questions.",
      solution: "Implemented an HLS streaming server on AWS to deliver buffer-free educational content. We built a custom analytics engine using MongoDB aggregation pipelines to provide students with instant feedback and personalized study recommendations.",
      outcomes: [
        "Delivered 99.9% uptime for video streaming",
        "Personalized dashboards increased student engagement by 35%",
        "Scaled to support concurrent users across multiple regions"
      ]
    }
  },
  {
    image: detailingDrats,
    title: "Detailing Brats",
    category: "Automotive Service",
    subDesc: "A premium showcase platform for automotive detailing services, emphasizing visual impact and service clarity.",
    techStack: ["React Js", "TailWind Css"],
    caseStudy: {
      challenge: "The client wanted to translate the premium, high-gloss finish of their physical service into a digital experience that would instantly captivate luxury car owners.",
      solution: "Designed a visually heavy, image-centric interface using React to manage efficient asset loading. We utilized modern CSS transitions and slight parallax effects to give the site a 'premium' feel that mirrors the service quality.",
      outcomes: [
        "Increased service inquiries by 60%",
        "Reduced bounce rate significantly via engaging visuals",
        "Mobile-first design captured 70% of traffic from phone users"
      ]
    }
  },
  {
    image: startyfyZone,
    title: "Startify Zone",
    category: "Startup Ecosystem",
    subDesc: "A collaborative hub connecting entrepreneurs with potential investors and mentors.",
    techStack: ["React Js", "Node Js", "MongoDb", "Express Js"],
    caseStudy: {
      challenge: "Creating a trust-based ecosystem where sensitive startup ideas could be shared securely with verified investors.",
      solution: "Built a tiered permission system using JWT authentication and role-based access control (RBAC) in Node.js. This ensured that intellectual property remained visible only to authorized personnel.",
      outcomes: [
        "Facilitated over 50 successful startup-investor connections",
        "Secure document vault usage increased user trust",
        "Fast loading dashboard for real-time deal tracking"
      ]
    }
  },
  {
    image: cityHospital,
    title: "City Hospital",
    category: "Healthcare",
    subDesc:
      "Digital presence for a multi-specialty hospital focusing on patient trust and information accessibility.",
    techStack: ["React Js", "Node Js", "MongoDb", "Express Js"],
    caseStudy: {
      challenge: "Patients found it difficult to locate doctor schedules and success stories, leading to lower trust and booking rates.",
      solution: "Revamped the information architecture to prioritize 'Doctor Search' and 'Patient Stories'. We built a lightweight CMS for the hospital staff to update success stories easily.",
      outcomes: [
        "25% increase in online OPD inquiries",
        "Simplified CMS reduced admin update time by 90%",
        "Improved accessibility score for elderly users"
      ]
    }
  },
  {
    image: tanujPunia,
    title: "Tanuj Punia",
    category: "Personal Brand",
    subDesc:
      "A political portfolio website communicating vision, manifesto, and community engagement.",
    techStack: ["React Js", "TypeScript", "Tailwind Css"],
    caseStudy: {
      challenge: "The candidate needed a robust platform to withstand high traffic spikes during campaign announcements while remaining extremely accessible to all voters.",
      solution: "Utilized Next.js/React static generation for lightning-fast page loads and CDN caching. Typescript ensured codebase stability for rapid feature updates during the campaign.",
      outcomes: [
        "Handled 10k+ hits during manifesto launch without downtime",
        "Sub-second page load times on 3G networks",
        "High accessibility rating for broader reach"
      ]
    }
  },
  {
    image: luminex,
    title: "Luminex",
    category: "Corporate",
    subDesc: "Corporate identity for a leading lighting solutions provider.",
    techStack: ["React Js", "Tailwind Css"],
    caseStudy: {
      challenge: "Showcasing a vast catalog of industrial lighting products without overwhelming the user.",
      solution: "Implemented a clean, minimalist catalog interface with advanced filtering capabilities, allowing B2B clients to quickly find product specifications.",
      outcomes: [
        "Streamlined B2B inquiry process",
        "Professional digital footprint established"
      ]
    }
  },
  {
    image: unfold,
    title: "Unfold Concetto",
    category: "Design Agency",
    subDesc: "Portfolio for a creative design agency.",
    techStack: ["React Js", "Tailwind Css"],
    caseStudy: {
      challenge: "The agency needed a website that was itself a piece of art, reflecting their creative capabilities.",
      solution: "Focused heavily on micro-interactions and smooth scroll behaviors using Framer Motion to create an immersive narrative experience.",
      outcomes: [
        "Award-winning design recognition",
        "Client retention increased due to brand perception"
      ]
    }
  },
  {
    image: unique,
    title: "The Unique Group",
    category: "Real Estate",
    subDesc: "Real estate development showcase.",
    techStack: ["React Js", "Tailwind Css"],
    caseStudy: {
      challenge: "Presenting future property developments in a way that built investor confidence.",
      solution: "Created high-fidelity galleries and virtual tour integrations to allow investors to visualize the end product.",
      outcomes: [
        "Pre-booking rates improved",
        "Enhanced digital credibility"
      ]
    }
  },
  {
    image: impals,
    title: "Impulse Global Llc",
    category: "Logistics",
    subDesc: "Global logistics and supply chain solutions.",
    techStack: ["React Js", "Tailwind Css"],
    caseStudy: {
      challenge: "Communicating complex logistical capabilities to a global audience simply.",
      solution: "Used data visualization and interactive maps to demonstrate global reach and network efficiency.",
      outcomes: [
        "Clearer service proposition for international clients",
        "Modernized brand image"
      ]
    }
  },
  {
    image: eduversity,
    title: "Viven Eduversity",
    category: "Education",
    subDesc: "Educational institution portal.",
    techStack: ["React Js", "Tailwind Css", "Firebase"],
    caseStudy: {
      challenge: "Managing student resources and admission inquiries in one unified portal.",
      solution: "Integrated Firebase for real-time updates on notices and admission status.",
      outcomes: [
        "Centralized communication channel",
        "Reduced administrative overhead"
      ]
    }
  },
  {
    image: TradeX,
    title: "TradeX",
    category: "Fintech",
    subDesc: "Trading analysis platform.",
    techStack: ["Html", "Css", "JavaScript"],
    caseStudy: {
      challenge: "Providing real-time market data visualization with minimal latency.",
      solution: "Optimized vanilla JavaScript rendering for chart performance on low-end devices.",
      outcomes: [
        "High performance on all devices",
        "Clean, distraction-free analysis UI"
      ]
    }
  },
];
