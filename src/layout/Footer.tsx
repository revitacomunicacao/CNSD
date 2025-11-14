import logo from "@/assets/logo.png"
import bgFooter from "@/assets/fundo-rodape.jpg"
import assinatura from "@/assets/assinatura.png"

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaSoundcloud } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="flex flex-col lg:flex-row w-full">
        {/* INFO SECTION */}
        <div className="flex flex-col gap-5 justify-center items-center w-full lg:w-1/2 p-8 lg:p-12">
          <img src={logo} alt="logo da cnsd" className="w-32 lg:w-auto" />
          <h2 className="text-2xl lg:text-3xl text-[#0b2255] font-bold text-center">(34) 3331-9900</h2>
          <p className="text-sm lg:text-base text-[#0b2255] font-bold text-center px-4">
            Praça Dr. Tomaz Ulhôa, 360, Abadia<br className="lg:hidden" /> CEP 38025-050 - Uberaba-MG
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/cnsduberaba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0b2255] hover:scale-110 transition-transform duration-200"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>

            <a
              href="https://www.instagram.com/cnsduberaba/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0b2255] hover:scale-110 transition-transform duration-200"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://x.com/cnsduberaba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0b2255] hover:scale-110 transition-transform duration-200"
              aria-label="Twitter/X"
            >
              <FaTwitter size={20} />
            </a>

            <a
              href="https://www.youtube.com/cnsduberaba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0b2255] hover:scale-110 transition-transform duration-200"
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </a>

            <a
              href="https://open.spotify.com/playlist/0xOcPfX7nWEFhmSOkDZa8p?si=CZ1yL_pjTAe8MVcrjHts-A&nd=1&dlsi=faf5d353c32c4c64"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0b2255] hover:scale-110 transition-transform duration-200"
              aria-label="Spotify"
            >
              <FaSpotify size={20} />
            </a>

            <a
              href="https://soundcloud.com/cnsduberaba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0b2255] hover:scale-110 transition-transform duration-200"
              aria-label="SoundCloud"
            >
              <FaSoundcloud size={20} />
            </a>
          </div>
        </div>

        {/* MAP SECTION */}
        <div 
          className="flex justify-center items-center w-full lg:w-1/2 p-4 min-h-[250px] lg:min-h-[400px]" 
          style={{
            backgroundImage: `url(${bgFooter})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
          }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3755.0624066907635!2d-47.93143169999999!3d-19.752503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bad02fd4707f5b%3A0x8417f31ed6feaa88!2sPra%C3%A7a%20Dr.%20Thomaz%20Ulh%C3%B4a%2C%20360%20-%20Nossa%20Sra.%20da%20Abadia%2C%20Uberaba%20-%20MG%2C%2038025-050!5e0!3m2!1spt-BR!2sbr!4v1760121314652!5m2!1spt-BR!2sbr" 
            className="w-full h-[250px] lg:h-[350px] rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização CNSD"
          />
        </div>
      </div>
      <div className="w-full flex justify-end bg-[#660042] p-2">
        <img src={assinatura} alt="assinatura da revita" />
      </div>
    </footer>
  )
}