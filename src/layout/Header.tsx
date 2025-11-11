import { useState, useEffect } from "react"
import logo from "@/assets/logo.png"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { ChevronDown, Search, Menu, ChevronRight, X } from "lucide-react"

import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaUsers, FaUserShield, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaSpotify, FaSoundcloud } from "react-icons/fa";
import { PiTelevisionBold } from "react-icons/pi";
import { useContent } from "@/hooks/useContent"

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

interface ILatestPost {
  id: number
  title?: string
  slug: string
  featured_image?: string | false
}

export const Header = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const [areaRestritaOpen, setAreaRestritaOpen] = useState(false)
  const [egressoMenuOpen, setEgressoMenuOpen] = useState(false)
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

  const egressoLinks: Array<{ name: string; href: string; external?: boolean }> = [
    {
      name: "Faça seu cadastro",
      href: "/egresso",
    },
    {
      name: "Deixe seu depoimento",
      href: "/depoimento-egresso/",
    },
  ]

  const areaRestritaLinks = [
    {
      label: "Aluno",
      href: "https://educacional.dominicanas.org.br/CNSD/",
      icon: <FaUserShield className="text-lg" />,
    },
    {
      label: "Pais/Responsáveis",
      href: "https://educacional.dominicanas.org.br/CNSD/",
      icon: <FaUsers className="text-lg" />,
    },
    {
      label: "Colaboradores",
      href: "https://educacional.dominicanas.org.br/CNSD/",
      icon: <FaUserShield className="text-lg" />,
    },
  ]

  const { data: latestPosts, loading: loadingLatestPosts, error: latestPostsError } = useContent<ILatestPost>("posts/ultimos")

  // Previne scroll quando o menu está aberto
  useEffect(() => {
    if (mobileMenuOpen || areaRestritaOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen, areaRestritaOpen])

  useEffect(() => {
    if (!areaRestritaOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAreaRestritaOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [areaRestritaOpen])
  
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
          href: "/publicacoes/revista-informativo"
        },
        {
          name: "Na Mídia",
          href: "/publicacoes/na-midia"
        }, {
          name: "Notícias",
          href: "/publicacoes/noticias"
        },
      ]
    },
    {
      name: "Fale Conosco",
      href: "/fale-conosco"
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

      {areaRestritaOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setAreaRestritaOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
            <div className="relative w-full max-w-[1200px] bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-[#0b2255] transition-colors"
                onClick={() => setAreaRestritaOpen(false)}
                aria-label="Fechar área restrita"
              >
                <X size={24} />
              </button>

              <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-[#0b2255]">Área Restrita</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Acompanhe as últimas notícias e acesse rapidamente os portais oficiais.
                </p>
              </div>

              <div className="px-8 pb-8 overflow-y-auto">
                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loadingLatestPosts &&
                      Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={`skeleton-${index}`}
                          className="flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white"
                        >
                          <div className="h-40 bg-gray-200 animate-pulse" />
                          <div className="p-4 space-y-2">
                            <div className="h-3 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-4/5" />
                          </div>
                        </div>
                      ))}

                    {!loadingLatestPosts && latestPostsError && (
                      <div className="col-span-full text-sm text-red-600 border border-red-100 rounded-lg p-4 bg-red-50">
                        Não foi possível carregar as últimas notícias. Tente novamente mais tarde.
                      </div>
                    )}

                    {!loadingLatestPosts && !latestPostsError && latestPosts?.length
                      ? latestPosts.slice(0, 3).map((post) => {
                          const hasImage = post.featured_image && typeof post.featured_image === "string"
                          return (
                            <Link
                              key={post.id}
                              to={`/publicacoes/noticias/${post.slug}`}
                              className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white"
                              onClick={() => setAreaRestritaOpen(false)}
                            >
                              <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                                {hasImage ? (
                                  <img
                                    src={post.featured_image as string}
                                    alt={post.title ?? "Notícia CNSD"}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#0b2255]/5 to-[#0b2255]/10 text-[#0b2255] text-sm font-semibold px-4 text-center">
                                    Imagem indisponível
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <p className="text-sm font-semibold text-[#0b2255] leading-snug line-clamp-3">
                                  {post.title}
                                </p>
                              </div>
                            </Link>
                          )
                        })
                      : null}
                  </div>

                  <div className="w-full lg:w-80 bg-gradient-to-br from-[#0b2255] to-[#1877F2] text-white rounded-2xl p-6 flex flex-col gap-6 justify-between relative overflow-hidden">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold uppercase tracking-wide">Portais Oficiais</h3>
                      <p className="text-sm text-white/90">
                        Acesse os ambientes exclusivos para estudantes, famílias e colaboradores.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      {areaRestritaLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 font-semibold text-sm flex items-center justify-center gap-2 uppercase"
                          onClick={() => setAreaRestritaOpen(false)}
                        >
                          {item.icon}
                          {item.label}
                        </a>
                      ))}
                    </div>

                    <p className="text-sm text-white/80">Precisa de ajuda? Entre em contato com a secretaria.</p>
                  </div>
                </div>
              </div>
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
              <div
                className="relative"
                onMouseEnter={() => setEgressoMenuOpen(true)}
                onMouseLeave={() => setEgressoMenuOpen(false)}
              >
                <button
                  className={`flex flex-col items-center gap-1 transition-colors group ${
                    egressoMenuOpen ? "text-[#0b2255]" : "text-[#b3b3b3] hover:text-[#0b2255]"
                  }`}
                  onClick={() => setEgressoMenuOpen((prev) => !prev)}
                >
                  <RiGraduationCapFill size={28} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-medium whitespace-nowrap flex items-center gap-1">
                    EGRESSO
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${egressoMenuOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transition-all duration-200 z-50 ${
                    egressoMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <ul className="py-2">
                    {egressoLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#0b2255] transition-colors duration-200"
                          onClick={() => setEgressoMenuOpen(false)}
                        >
                          <span>{link.name}</span>
                          {link.external && <ChevronRight className="w-4 h-4 text-gray-300" />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
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
              
              <button 
                className="flex flex-col items-center gap-1 text-[#b3b3b3] hover:text-[#0b2255] transition-colors group"
                onClick={() => setAreaRestritaOpen(true)}
              >
                <FaUserShield size={28} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-medium whitespace-nowrap">ÁREA RESTRITA</span>
              </button>
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