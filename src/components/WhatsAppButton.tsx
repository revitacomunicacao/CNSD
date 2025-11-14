import { FaWhatsapp } from "react-icons/fa"

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+553499000326"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center w-16 h-16"
      aria-label="Fale conosco no WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}

