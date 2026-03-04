import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 py-16 lg:px-8">
        <Link href="/">
          <Button
            variant="outline"
            className="mb-8 border-purple-400 text-white hover:bg-purple-800/50 bg-purple-800/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </Link>

        <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-purple-700/50 p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-white mb-8">Termos de Uso</h1>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Escopo dos Serviços</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                A Fluintech oferece soluções de automação e inteligência artificial para atendimento ao cliente,
                incluindo chatbots, agendamentos automatizados e análises inteligentes.
              </p>
              <p className="text-gray-100 leading-relaxed">
                Nossos serviços são fornecidos através de plataforma web e integração via API, sujeitos aos termos e
                condições estabelecidos neste documento.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Responsabilidades do Usuário</h2>
              <ul className="text-gray-100 leading-relaxed space-y-2">
                <li>• Fornecer informações precisas e atualizadas durante o cadastro</li>
                <li>• Manter a confidencialidade das credenciais de acesso</li>
                <li>• Utilizar os serviços de acordo com as leis aplicáveis</li>
                <li>• Não utilizar os serviços para atividades ilegais ou prejudiciais</li>
                <li>• Respeitar os limites de uso estabelecidos no plano contratado</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Propriedade Intelectual</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                Todos os direitos de propriedade intelectual relacionados aos serviços da Fluintech, incluindo software,
                algoritmos, design e conteúdo, são de propriedade exclusiva da empresa.
              </p>
              <p className="text-gray-100 leading-relaxed">
                O usuário mantém os direitos sobre seus próprios dados e conteúdos, concedendo à Fluintech licença
                limitada para processamento conforme necessário para prestação dos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Limitação de Responsabilidade</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                A Fluintech não se responsabiliza por danos indiretos, lucros cessantes ou perdas de dados decorrentes
                do uso dos serviços.
              </p>
              <p className="text-gray-100 leading-relaxed">
                Nossa responsabilidade está limitada ao valor pago pelos serviços no período de 12 meses anteriores ao
                evento que deu origem à reclamação.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Vigência e Alterações</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                Estes termos entram em vigor na data de aceitação pelo usuário e permanecem válidos durante todo o
                período de utilização dos serviços.
              </p>
              <p className="text-gray-100 leading-relaxed">
                A Fluintech reserva-se o direito de alterar estes termos mediante notificação prévia de 30 dias aos
                usuários.
              </p>
            </section>

            <div className="mt-12 p-6 bg-black/50 rounded-lg border border-purple-600/50">
              <p className="text-gray-100 text-sm">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>
              <p className="text-gray-100 text-sm mt-2">
                Para dúvidas sobre estes termos, entre em contato:{" "}
                <a href="mailto:legal@fluintech.com.br" className="text-purple-300 hover:text-purple-200">
                  legal@fluintech.com.br
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
