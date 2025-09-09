import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PoliticaPrivacidade() {
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
          <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidade</h1>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Dados Coletados</h2>
              <p className="text-gray-100 leading-relaxed mb-4">Coletamos as seguintes categorias de dados pessoais:</p>
              <ul className="text-gray-100 leading-relaxed space-y-2">
                <li>
                  • <strong>Dados de identificação:</strong> nome, e-mail, telefone, empresa
                </li>
                <li>
                  • <strong>Dados de uso:</strong> logs de acesso, interações com a plataforma, preferências
                </li>
                <li>
                  • <strong>Dados técnicos:</strong> endereço IP, tipo de navegador, sistema operacional
                </li>
                <li>
                  • <strong>Dados de comunicação:</strong> mensagens trocadas através dos chatbots e sistema
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Finalidade do Uso dos Dados</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                Utilizamos seus dados pessoais para as seguintes finalidades:
              </p>
              <ul className="text-gray-100 leading-relaxed space-y-2">
                <li>• Prestação dos serviços de automação e IA</li>
                <li>• Melhoria contínua dos algoritmos e funcionalidades</li>
                <li>• Suporte técnico e atendimento ao cliente</li>
                <li>• Comunicação sobre atualizações e novos recursos</li>
                <li>• Análises estatísticas e relatórios de desempenho</li>
                <li>• Cumprimento de obrigações legais e regulamentares</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Compartilhamento com Terceiros</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                Seus dados podem ser compartilhados nas seguintes situações:
              </p>
              <ul className="text-gray-100 leading-relaxed space-y-2">
                <li>
                  • <strong>Provedores de serviços:</strong> empresas que nos auxiliam na prestação dos serviços
                  (hospedagem, analytics)
                </li>
                <li>
                  • <strong>Obrigações legais:</strong> quando exigido por lei ou ordem judicial
                </li>
                <li>
                  • <strong>Proteção de direitos:</strong> para proteger nossos direitos, propriedade ou segurança
                </li>
              </ul>
              <p className="text-gray-100 leading-relaxed mt-4">
                Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins de marketing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Direitos do Usuário</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                Conforme a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes direitos:
              </p>
              <ul className="text-gray-100 leading-relaxed space-y-2">
                <li>
                  • <strong>Acesso:</strong> solicitar informações sobre o tratamento de seus dados
                </li>
                <li>
                  • <strong>Correção:</strong> solicitar a correção de dados incompletos ou inexatos
                </li>
                <li>
                  • <strong>Exclusão:</strong> solicitar a eliminação de dados desnecessários ou tratados em
                  desconformidade
                </li>
                <li>
                  • <strong>Portabilidade:</strong> solicitar a transferência de dados para outro fornecedor
                </li>
                <li>
                  • <strong>Oposição:</strong> opor-se ao tratamento de dados em determinadas situações
                </li>
                <li>
                  • <strong>Revogação:</strong> revogar o consentimento a qualquer momento
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Segurança dos Dados</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais:
              </p>
              <ul className="text-gray-100 leading-relaxed space-y-2">
                <li>• Criptografia de dados em trânsito e em repouso</li>
                <li>• Controles de acesso rigorosos e autenticação multifator</li>
                <li>• Monitoramento contínuo de segurança e detecção de ameaças</li>
                <li>• Backups regulares e planos de recuperação de desastres</li>
                <li>• Treinamento regular da equipe sobre proteção de dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contato para Dúvidas</h2>
              <p className="text-gray-100 leading-relaxed mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
              </p>
              <div className="bg-black/50 rounded-lg p-6 border border-purple-600/50">
                <p className="text-gray-100">
                  <strong>E-mail:</strong> privacidade@fluintech.com.br
                </p>
                <p className="text-gray-100">
                  <strong>Telefone:</strong> +55 (44) 9999-9999
                </p>
                <p className="text-gray-100">
                  <strong>Endereço:</strong> Maringá, PR – Brasil
                </p>
              </div>
            </section>

            <div className="mt-12 p-6 bg-black/50 rounded-lg border border-purple-600/50">
              <p className="text-gray-100 text-sm">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>
              <p className="text-gray-100 text-sm mt-2">
                Esta política pode ser atualizada periodicamente. Recomendamos a consulta regular para se manter
                informado sobre nossas práticas de privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
