import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Skeleton,
  Statistic,
  Steps,
  Tag,
  Typography,
  message,
} from 'antd';
import type { ThemeConfig } from 'antd';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  LayoutDashboard,
  MonitorSmartphone,
  Palette,
  Rocket,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { apiClient } from './api';
import { CaseVisual } from './components/CaseVisual';
import { Logo } from './components/Logo';
import { MotionSection } from './components/MotionSection';
import { useLandingData } from './hooks/useLandingData';
import type { LeadPayload } from './types';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#4F46E5',
    colorInfo: '#4F46E5',
    colorTextBase: '#0A0F1F',
    borderRadius: 14,
    fontFamily: "'Sora', system-ui, sans-serif",
    colorLink: '#4F46E5',
  },
  components: {
    Button: {
      borderRadius: 999,
      controlHeight: 46,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 22,
      boxShadowTertiary: '0 40px 80px -40px rgba(10,15,31,.28)',
    },
    Input: {
      borderRadius: 12,
      controlHeight: 44,
    },
  },
};

const iconMap: Record<string, LucideIcon> = {
  palette: Palette,
  layout: LayoutDashboard,
  rocket: Rocket,
  monitor: MonitorSmartphone,
  compass: Compass,
  'shopping-bag': ShoppingBag,
};

function SectionHeading({
  kicker,
  title,
  description,
  inverse = false,
}: {
  kicker: string;
  title: string;
  description: string;
  inverse?: boolean;
}) {
  return (
    <div className={`section-heading ${inverse ? 'section-heading--inverse' : ''}`}>
      <span className="kicker">{kicker}</span>
      <Title level={2}>{title}</Title>
      <Paragraph>{description}</Paragraph>
    </div>
  );
}

function App() {
  const { products, services, caseStudies, testimonials, loading, error } = useLandingData();
  const [form] = Form.useForm<LeadPayload>();
  const [messageApi, contextHolder] = message.useMessage();
  const [submitting, setSubmitting] = useState(false);
  const deliveryProduct = products.find((product) => product.slug === 'gestao-delivery-hamburguerias');
  const maisBurguerCase = caseStudies.find((caseStudy) => caseStudy.title === 'Mais Burguer');
  const productOptions = useMemo(
    () => products.map((product) => ({ label: product.name, value: product.name })),
    [products],
  );

  async function handleLeadSubmit(values: LeadPayload) {
    setSubmitting(true);
    try {
      await apiClient.createLead(values);
      messageApi.success('Recebemos seu contato. Em breve retornamos.');
      form.resetFields();
    } catch {
      messageApi.error('Não foi possível enviar agora. Tente novamente em instantes.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <Layout className="site-shell">
        <Header className="site-header">
          <a href="#top" className="site-header__brand">
            <Logo />
          </a>
          <nav className="site-header__nav" aria-label="Navegação principal">
            <a href="#produtos">Produtos</a>
            <a href="#servicos">Serviços</a>
            <a href="#cases">Cases</a>
            <a href="#contato">Contato</a>
          </nav>
          <Button type="primary" href="#contato" icon={<ArrowRight size={16} />}>
            Fale com a gente
          </Button>
        </Header>

        <Content id="top">
          <section className="hero-section">
            <div className="container hero-grid">
              <motion.div
                className="hero-copy"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Tag className="hero-pill">Presença digital premium</Tag>
                <Title>Presença digital e marcas de alto impacto para o seu nicho</Title>
                <Paragraph>
                  Branding, sites, landing pages e operações digitais com acabamento de agência
                  premium para empresas que precisam parecer tão fortes quanto são.
                </Paragraph>
                <div className="hero-actions">
                  <Button type="primary" size="large" href="#contato" icon={<Sparkles size={18} />}>
                    Começar projeto
                  </Button>
                  <Button size="large" className="hero-secondary" href="#produtos">
                    Ver soluções
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="hero-mark"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
                >
                <img
                  className="hero-mark__logo"
                  src="/assets/sooplix-logo-final-selected-transparent.svg"
                  alt="Sooplix web - Soluções Digitais"
                />
                <div className="hero-mark__halo" />
              </motion.div>
            </div>
          </section>

          <MotionSection className="credibility-band">
            <div className="container">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <Statistic title="Projetos digitais" value={32} suffix="+" />
                </Col>
                <Col xs={24} md={8}>
                  <Statistic title="Nichos atendidos" value={9} suffix="+" />
                </Col>
                <Col xs={24} md={8}>
                  <Statistic title="Foco" value="Marca + Conversão" />
                </Col>
              </Row>
            </div>
          </MotionSection>

          <MotionSection id="produtos" className="section section--light">
            <div className="container">
              <SectionHeading
                kicker="Produtos"
                title="Soluções digitais para presença, marca e operação"
                description="Produtos pensados para criar percepção premium, gerar demanda e organizar canais digitais sem excesso de complexidade."
              />
              {error ? <div className="load-error">{error}</div> : null}
              <Row gutter={[24, 24]}>
                {loading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <Col xs={24} md={12} xl={6} key={index}>
                        <Card className="product-card">
                          <Skeleton active paragraph={{ rows: 5 }} />
                        </Card>
                      </Col>
                    ))
                  : products.map((product) => (
                      <Col xs={24} md={12} xl={6} key={product.slug}>
                        <Card className={`product-card ${product.highlight ? 'product-card--highlight' : ''}`}>
                          <div className="card-topline">
                            <Tag>{product.category}</Tag>
                            {product.highlight ? <span>Destaque</span> : null}
                          </div>
                          <Title level={3}>{product.name}</Title>
                          <Text className="product-card__tagline">{product.tagline}</Text>
                          <Paragraph>{product.description}</Paragraph>
                          <Divider />
                          <ul>
                            {product.features.map((feature) => (
                              <li key={feature}>
                                <CheckCircle2 size={16} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </Col>
                    ))}
              </Row>
            </div>
          </MotionSection>

          <MotionSection className="section section--dark delivery-section">
            <div className="container">
              <Row gutter={[40, 40]} align="middle">
                <Col xs={24} lg={12}>
                  <span className="kicker">Case • Delivery</span>
                  <Title level={2}>{deliveryProduct?.name || 'Gestão de Delivery para Hamburguerias'}</Title>
                  <Paragraph>
                    {deliveryProduct?.description ||
                      'Cardápio digital, pedidos, integração e gestão para hamburguerias que querem vender com mais controle.'}
                  </Paragraph>
                  <Steps
                    direction="vertical"
                    current={3}
                    items={(deliveryProduct?.features || [
                      'Cardápio digital',
                      'Pedidos online',
                      'Fluxo operacional',
                      'Painel de gestão',
                    ]).map((feature) => ({ title: feature }))}
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <div className="delivery-frame">
                    {maisBurguerCase ? (
                      <CaseVisual caseStudy={maisBurguerCase} showProjectMockup />
                    ) : (
                      <CaseVisual
                        caseStudy={{
                          id: 'mais-burguer-preview',
                          title: 'Mais Burguer',
                          segment: 'Delivery / Hamburgueria',
                          imageUrl: '',
                          description: '',
                          order: 1,
                        }}
                        showProjectMockup
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </MotionSection>

          <MotionSection id="servicos" className="section section--light">
            <div className="container">
              <SectionHeading
                kicker="Serviços"
                title="Da estratégia visual ao produto digital em produção"
                description="Cada serviço cobre uma parte objetiva do caminho: clareza de marca, presença digital, conversão e operação."
              />
              <Row gutter={[24, 24]}>
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <Col xs={24} md={12} lg={8} key={index}>
                        <Card className="service-card">
                          <Skeleton active paragraph={{ rows: 3 }} />
                        </Card>
                      </Col>
                    ))
                  : services.map((service) => {
                      const Icon = iconMap[service.icon] || Sparkles;
                      return (
                        <Col xs={24} md={12} lg={8} key={service.slug}>
                          <Card className="service-card">
                            <span className="service-card__icon">
                              <Icon size={24} />
                            </span>
                            <Title level={3}>{service.name}</Title>
                            <Paragraph>{service.description}</Paragraph>
                          </Card>
                        </Col>
                      );
                    })}
              </Row>
            </div>
          </MotionSection>

          <MotionSection id="cases" className="section section--dark">
            <div className="container">
              <SectionHeading
                kicker="Cases"
                title="Portfólio por segmento, com foco em contexto real"
                description="Do delivery à clínica, cada projeto parte da realidade do nicho e transforma isso em percepção, clareza e ação."
                inverse
              />
              <Row gutter={[24, 24]}>
                {loading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <Col xs={24} md={12} key={index}>
                        <Card className="case-card">
                          <Skeleton active paragraph={{ rows: 4 }} />
                        </Card>
                      </Col>
                    ))
                  : caseStudies.map((caseStudy) => (
                      <Col xs={24} md={12} key={`${caseStudy.title}-${caseStudy.segment}`}>
                        <Card className="case-card">
                          <CaseVisual
                            caseStudy={caseStudy}
                            showProjectMockup={caseStudy.title.trim().toLowerCase() === 'mais burguer'}
                          />
                          <Tag>{caseStudy.segment}</Tag>
                          <Title level={3}>{caseStudy.title}</Title>
                          <Paragraph>{caseStudy.description}</Paragraph>
                        </Card>
                      </Col>
                    ))}
              </Row>
            </div>
          </MotionSection>

          <MotionSection className="section section--light testimonials-section">
            <div className="container">
              <SectionHeading
                kicker="Depoimentos"
                title="Projetos que elevam percepção e tornam a oferta mais clara"
                description="Um bom site institucional precisa ser bonito, mas também precisa explicar melhor, transmitir confiança e abrir conversas."
              />
              <Row gutter={[24, 24]}>
                {loading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <Col xs={24} lg={8} key={index}>
                        <Card className="testimonial-card">
                          <Skeleton active avatar paragraph={{ rows: 3 }} />
                        </Card>
                      </Col>
                    ))
                  : testimonials.map((testimonial) => (
                      <Col xs={24} lg={8} key={`${testimonial.author}-${testimonial.company}`}>
                        <Card className="testimonial-card">
                          <Paragraph>“{testimonial.quote}”</Paragraph>
                          <div className="testimonial-author">
                            <Avatar>{testimonial.author.charAt(0)}</Avatar>
                            <div>
                              <strong>{testimonial.author}</strong>
                              <span>
                                {testimonial.role} • {testimonial.company}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
              </Row>
            </div>
          </MotionSection>

          <MotionSection id="contato" className="section section--contact">
            <div className="container">
              <Row gutter={[40, 40]} align="middle">
                <Col xs={24} lg={11}>
                  <span className="kicker">Contato</span>
                  <Title level={2}>Vamos construir a presença digital da sua marca</Title>
                  <Paragraph>
                    Conte em poucas linhas o que você precisa. A Sooplix web retorna com um
                    próximo passo claro para transformar o projeto em site, marca ou operação.
                  </Paragraph>
                </Col>
                <Col xs={24} lg={13}>
                  <Card className="contact-card">
                    <Form form={form} layout="vertical" onFinish={handleLeadSubmit} requiredMark={false}>
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Nome"
                            name="name"
                            rules={[{ required: true, message: 'Informe seu nome.' }]}
                          >
                            <Input placeholder="Seu nome" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                              { required: true, message: 'Informe seu email.' },
                              { type: 'email', message: 'Use um email válido.' },
                            ]}
                          >
                            <Input placeholder="voce@email.com" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item label="Telefone" name="phone">
                            <Input placeholder="WhatsApp ou telefone" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item label="Produto de interesse" name="product">
                            <Select placeholder="Selecione uma opção" options={productOptions} allowClear />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        label="Mensagem"
                        name="message"
                        rules={[
                          { required: true, message: 'Conte brevemente sobre o projeto.' },
                          { min: 10, message: 'Escreva pelo menos 10 caracteres.' },
                        ]}
                      >
                        <Input.TextArea rows={5} placeholder="O que você quer criar ou melhorar?" />
                      </Form.Item>
                      <Button type="primary" htmlType="submit" loading={submitting} icon={<ArrowRight size={16} />}>
                        Enviar orçamento
                      </Button>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </div>
          </MotionSection>
        </Content>

        <Footer className="site-footer">
          <div className="container footer-grid">
            <Logo />
            <div className="footer-palette" aria-hidden="true">
              <span style={{ background: '#0A0F1F' }} />
              <span style={{ background: '#4F46E5' }} />
              <span style={{ background: '#6E8BFF' }} />
              <span style={{ background: '#8B94A6' }} />
              <span style={{ background: '#CDD5E2' }} />
              <span style={{ background: '#F5F7FB' }} />
            </div>
            <span>© 2026 Sooplix web</span>
          </div>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
