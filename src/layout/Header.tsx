import { useState, useEffect } from "react"
import logo from "@/assets/logo.png"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { ChevronDown, Search, Menu, ChevronRight, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaUsers, FaUserShield, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaSoundcloud } from "react-icons/fa";
import { PiTelevisionBold } from "react-icons/pi";

interface SubMenuItem {
  name: string
  href: string
  submenu?: SubMenuItem[]
}

interface MenuItem {
  name: string
  href: string
  submenu?: SubMenuItem[]
}

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [egressoDialogOpen, setEgressoDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<number | null>(null)
  const [expandedMobileSubMenu, setExpandedMobileSubMenu] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.open(`/?s=${encodeURIComponent(searchTerm)}`, '_blank')
    }
  }

  const toggleMobileMenu = (index: number) => {
    setExpandedMobileMenu(expandedMobileMenu === index ? null : index)
  }

  const toggleMobileSubMenu = (key: string) => {
    setExpandedMobileSubMenu(expandedMobileSubMenu === key ? null : key)
  }

  // Previne scroll quando o menu está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])
  
  const menu: MenuItem[] = [
    {
      name: "O Colégio",
      href: "/#",
      submenu: [
        {
          name: "Nossa História",
          href: "/o-colegio/nossa-historia",
        },
        {
          name: "Nossa Missão",
          href: "/o-colegio/nossa-missao",
        },
        {
          name: "Secretaria Acadêmica",
          href: "/o-colegio/secretaria-academica",
        },
        {
          name: "Estrutura Física",
          href: "/o-colegio/nossa-estrutura",
        },
        {
          name: "Trabalhe Conosco",
          href: "https://veritascnsd.tk/veritas_educacional/trabalhe_conosco",
        },
      ]
    },
    {
      name: "Ensino",
      href: "/#",
      submenu: [
        {
          name: "Proposta Pedagógica",
          href: "/ensino/proposta-pedagogica",
          submenu: [
            {
              name: "Formação Continua",
              href: "/ensino/proposta-pedagogica/formacao-continua"
            }
          ]
        },
        {
          name: "Educação Infantil",
          href: "/#",
          submenu: [
            {
              name: "Base Teórica-Pedagógica",
              href: "/ensino/educacao-infantil/base-teorica-pedagogica"
            }
          ]
        },
        {
          name: "Ensino Fundamental Anos Iniciais",
          href: "/#",
          submenu: [
            {
              name: "Base Teórica-Pedagógica",
              href: "/ensino/ensino-fundamental-anos-iniciais/base-teorica-pedagogica"
            }
          ]
        },
        {
          name: "Ensino Fundamental Anos Finais",
          href: "/#",
          submenu: [
            {
              name: "Base Teórica-Pedagógica",
              href: "/ensino/ensino-fundamental-anos-finais/base-teorica-pedagogica"
            },
            {
              name: "Desafios e Simulados",
              href: "/ensino/ensino-fundamental-anos-finais/desafios-e-simulados"
            },
          ]
        },
        {
          name: "Ensino Médio",
          href: "/#",
          submenu: [
            {
              name: "Base Teórica-Pedagógica",
              href: "/ensino/ensino-medio/base-teorica-pedagogica"
            },
            {
              name: "Simulados",
              href: "/ensino/ensino-medio/simulados"
            },
            {
              name: "Formandos",
              href: "/ensino/ensino-medio/formandos"
            },
            {
              name: "Aprovados no Vestibular",
              href: "/ensino/ensino-medio/aprovados-no-vestibular"
            },
            {
              name: "Pré-Vestibular",
              href: "/ensino/ensino-medio/pre-vestibular"
            },
          ]
        },
        {
          name: "Ensino Técnico",
          href: "/#",
          submenu: [
            {
              name: "Base Teórica-Pedagógica",
              href: "/ensino/ensino-tecnico/base-teorica-pedagogica"
            },
            {
              name: "Formação Continua",
              href: "/ensino/ensino-tecnico/formacao-continua"
            },
            {
              name: "Administração",
              href: "/ensino/ensino-tecnico/administracao"
            },
          ]
        },
      ]
    },
    {
      name: "Atividades",
      href: "/#",
      submenu: [
        {
          name: "Esporte",
          href: "/#",
          submenu: [
            {
              name: "Escola de Esportes",
              href: "/atividades/esporte/escola-de-esportes",
            },
            {
              name: "Olimpíada",
              href: "/atividades/esporte/olimpiada",
            },
          ]
        },
        {
          name: "Pastoral",
          href: "/atividades/Pastoral"
        },
        {
          name: "Biblioteca",
          href: "/atividades/biblioteca"
        },
        {
          name: "Contraturno",
          href: "/#",
          submenu: [
            {
              name: "Período de Permanência Integral",
              href: "/atividades/contraturno/periodo-de-permanencia-integral"
            }, {
              name: "Flauta",
              href: "/atividades/contraturno/flauta"
            }, {
              name: "Apoio Pedagógico Fundamental Anos Iniciais",
              href: "/atividades/contraturno/apa-efai"
            }, {
              name: "Plantão de Apoio Pedagógico - Fundamental Anos Finais",
              href: "/atividades/contraturno/plantao-de-estudo-efaf"
            }, {
              name: "Plantão de Apoio Pedagógico - Ensino Médio",
              href: "/atividades/contraturno/plantao-de-estudo-em"
            }, {
              name: "Treinamentos",
              href: "/atividades/contraturno/treinamentos"
            },
          ]
        },
      ]
    },
    {
      name: "Responsabilidade Social",
      href: "/#",
      submenu: [
        {
          name: "Linha do Tempo",
          href: "/responsabilidade-social/linha-do-tempo"
        },
        {
          name: "Ensino Técnico",
          href: "/responsabilidade-social/ensino-tecnico"
        }, {
          name: "Processo Seletivo",
          href: "/responsabilidade-social/processo-seletivo"
        }, {
          name: "Parceiros",
          href: "/responsabilidade-social/parceiros"
        },
      ]
    },
    {
      name: "Publicações",
      href: "/#",
      submenu: [
        {
          name: "Revista/Informativo",
          href: "/revista-informatica"
        },
        {
          name: "Na Mídia",
          href: "/na-midia"
        }, {
          name: "Notícias",
          href: "/noticias"
        },
      ]
    },
    {
      name: "Fale Conosco",
      href: "/faleconosco"
    }
  ]
  return (
    <header className="flex flex-col w-full bg-white shadow-sm">
      {/* CUSTOM MOBILE SHEET */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sheet Content */}
          <div className="fixed top-0 right-0 h-full w-[300px] sm:w-[400px] bg-white z-50 shadow-2xl lg:hidden animate-in slide-in-from-right duration-500 ease-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-[#0b2255]">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-[#0b2255] transition-all hover:rotate-90 duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-2">
                  {menu.map((item, index) => (
                    <li 
                      key={index}
                      className="animate-in fade-in slide-in-from-left duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.submenu ? (
                        <div>
                          <button
                            onClick={() => toggleMobileMenu(index)}
                            className="flex items-center justify-between w-full px-4 py-3 text-left font-bold text-gray-900 hover:bg-gray-100 rounded-md transition-all hover:scale-[1.02] active:scale-95"
                          >
                            {item.name}
                            <ChevronRight 
                              className={`w-4 h-4 transition-transform ${
                                expandedMobileMenu === index ? 'rotate-90' : ''
                              }`}
                            />
                          </button>
                          {expandedMobileMenu === index && (
                            <ul className="ml-4 mt-2 space-y-2 animate-in fade-in slide-in-from-left duration-200">
                              {item.submenu.map((subitem, subindex) => {
                                const subKey = `${index}-${subindex}`
                                return (
                                  <li key={subindex}>
                                    {subitem.submenu ? (
                                      <div>
                                        <button
                                          onClick={() => toggleMobileSubMenu(subKey)}
                                          className="flex items-center justify-between w-full px-4 py-2 text-left text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-md transition-all hover:scale-[1.02] active:scale-95"
                                        >
                                          {subitem.name}
                                          <ChevronRight 
                                            className={`w-3 h-3 transition-transform ${
                                              expandedMobileSubMenu === subKey ? 'rotate-90' : ''
                                            }`}
                                          />
                                        </button>
                                        {expandedMobileSubMenu === subKey && (
                                          <ul className="ml-4 mt-2 space-y-1 animate-in fade-in slide-in-from-left duration-200">
                                            {subitem.submenu.map((subsubitem, subsubindex) => (
                                              <li key={subsubindex}>
                                                <Link
                                                  to={subsubitem.href}
                                                  onClick={() => setMobileMenuOpen(false)}
                                                  className="block px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-md transition-all hover:scale-[1.02] active:scale-95"
                                                >
                                                  {subsubitem.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </div>
                                    ) : (
                                      <Link
                                        to={subitem.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-md transition-all hover:scale-[1.02] active:scale-95"
                                      >
                                        {subitem.name}
                                      </Link>
                                    )}
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 font-bold text-gray-900 hover:bg-gray-100 rounded-md transition-all hover:scale-[1.02] active:scale-95"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* TOP BAR */}
      <div className="w-full bg-gray-50 border-b">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo da CNSD" className="w-auto" />
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-[#0b2255] p-2"
          >
            <Menu size={28} />
          </button>

          {/* SEARCH AND QUICK LINKS - HIDDEN ON MOBILE */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
            <form onSubmit={handleSearch} className="w-full max-w-md relative">
              <Input 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full pl-4 pr-12 h-11 border-gray-300 focus:border-[#0b2255] focus:ring-[#0b2255]" 
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0b2255] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
            
            <div className="flex gap-6">
              <Dialog open={egressoDialogOpen} onOpenChange={setEgressoDialogOpen}>
                <DialogTrigger asChild>
                  <button 
                    className="flex flex-col items-center gap-1 text-[#b3b3b3] hover:text-[#0b2255] transition-colors group"
                  >
                    <RiGraduationCapFill size={28} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-medium whitespace-nowrap">EGRESSO</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#0b2255]">Egresso</DialogTitle>
                    <DialogDescription>
                      Selecione uma opção
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-3 mt-4">
                    <a
                      href="/cadastro-egresso/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-4 bg-[#0b2255] text-white font-bold rounded-lg hover:bg-[#0b2255]/90 transition-colors duration-200"
                      onClick={() => setEgressoDialogOpen(false)}
                    >
                      FAÇA SEU CADASTRO
                    </a>
                    <a
                      href="/depoimento-egresso/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-4 bg-[#0b2255] text-white font-bold rounded-lg hover:bg-[#0b2255]/90 transition-colors duration-200"
                      onClick={() => setEgressoDialogOpen(false)}
                    >
                      DEIXE SEU DEPOIMENTO
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
              
              <a 
                href="http://webmail.cnsd.com.br/" 
                className="flex flex-col items-center gap-1 text-[#b3b3b3] hover:text-[#0b2255] transition-colors group"
              >
                <MdOutlineEmail size={28} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-medium whitespace-nowrap">WEBMAIL</span>
              </a>
              
              <a 
                href="/trabalhe-conosco/" 
                className="flex flex-col items-center gap-1 text-[#b3b3b3] hover:text-[#0b2255] transition-colors group"
              >
                <FaUsers size={28} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-medium whitespace-nowrap">TRABALHE CONOSCO</span>
              </a>
              
              <a 
                href="/tv-cnsd/" 
                className="flex flex-col items-center gap-1 text-[#b3b3b3] hover:text-[#0b2255] transition-colors group"
              >
                <PiTelevisionBold size={28} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-medium whitespace-nowrap">TV CNSD</span>
              </a>
              
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button 
                    className="flex flex-col items-center gap-1 text-[#b3b3b3] hover:text-[#0b2255] transition-colors group"
                  >
                    <FaUserShield size={28} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-medium whitespace-nowrap">ÁREA RESTRITA</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#0b2255]">Área Restrita</DialogTitle>
                    <DialogDescription>
                      Selecione o tipo de acesso desejado
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-3 mt-4">
                    <a
                      href="https://educacional.dominicanas.org.br/CNSD/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-4 bg-[#0b2255] text-white font-bold rounded-lg hover:bg-[#0b2255]/90 transition-colors duration-200"
                      onClick={() => setDialogOpen(false)}
                    >
                      ALUNO
                    </a>
                    <a
                      href="https://educacional.dominicanas.org.br/CNSD/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-4 bg-[#0b2255] text-white font-bold rounded-lg hover:bg-[#0b2255]/90 transition-colors duration-200"
                      onClick={() => setDialogOpen(false)}
                    >
                      PAIS/RESPONSÁVEIS
                    </a>
                    <a
                      href="https://educacional.dominicanas.org.br/CNSD/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-4 bg-[#0b2255] text-white font-bold rounded-lg hover:bg-[#0b2255]/90 transition-colors duration-200"
                      onClick={() => setDialogOpen(false)}
                    >
                      COLABORADORES
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* MENU DE NAVEGAÇÃO - HIDDEN ON MOBILE */}
      <nav className="hidden lg:block w-full bg-white border-t shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <ul className="flex items-center justify-center gap-1 flex-1">
              {menu.map((item, index) => (
              <li 
                key={index}
                className="relative group"
                onMouseEnter={() => setOpenMenu(index)}
                onMouseLeave={() => {
                  setOpenMenu(null)
                  setOpenSubMenu(null)
                }}
              >
                {item.submenu ? (
                  <>
                    <button className="flex items-center gap-1 px-4 py-4 text-sm font-bold text-gray-900 hover:text-[#0b2255] transition-colors duration-200">
                      {item.name}
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openMenu === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {/* Dropdown */}
                    <div 
                      className={`absolute top-full left-0 mt-0 w-[320px] bg-white border border-gray-200 rounded-lg shadow-xl overflow-visible transition-all duration-300 origin-top z-50 ${
                        openMenu === index 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="py-2">
                        {item.submenu.map((subitem, subindex) => {
                          const subMenuKey = `${index}-${subindex}`
                          return (
                            <div 
                              key={subindex} 
                              className="relative"
                              onMouseEnter={() => subitem.submenu && setOpenSubMenu(subMenuKey)}
                              onMouseLeave={() => setOpenSubMenu(null)}
                            >
                              <Link
                                to={subitem.href}
                                className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0b2255] transition-colors duration-200"
                              >
                                <span className="font-bold">{subitem.name}</span>
                                {subitem.submenu && (
                                  <ChevronDown className="w-4 h-4 -rotate-90" />
                                )}
                              </Link>
                              
                              {/* Sub-submenu lateral */}
                              {subitem.submenu && (
                                <div 
                                  className={`absolute left-full top-0 ml-1 w-[280px] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transition-all duration-300 z-50 ${
                                    openSubMenu === subMenuKey
                                      ? 'opacity-100 visible translate-x-0'
                                      : 'opacity-0 invisible -translate-x-2 pointer-events-none'
                                  }`}
                                >
                                  <div className="py-2">
                                    {subitem.submenu.map((subsubitem, subsubindex) => (
                                      <Link
                                        key={subsubindex}
                                        to={subsubitem.href}
                                        className="block px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-[#0b2255] transition-colors duration-200"
                                      >
                                        {subsubitem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-4 py-4 text-sm font-bold text-gray-900 hover:text-[#0b2255] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
              ))}
            </ul>

            {/* REDES SOCIAIS */}
            <div className="flex items-center gap-3 ml-4">
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
        </div>
      </nav>
    </header>
  )
}