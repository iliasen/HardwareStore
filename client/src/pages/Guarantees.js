import React from 'react'
import { SHOP_ROUTE } from '../utils/consts'
import { NavLink } from 'react-router-dom'

const Guarantees = () => {
  return (
    <div className="payment-guarantees-back">
      <div className="payment-guarantees-container">
        <div className="context_margin">
          <h1>Гарантии интернет-магазина Гефест</h1>

          <h2>Гарантийные обязательства</h2>

          <p>
            При покупке в интернет-магазине{' '}
            <NavLink to={SHOP_ROUTE} className="href_a">
              www.gefest.by
            </NavLink>{' '}
            ко всем товарам, имеющим гарантийные сроки, вам в обязательном
            порядке будет выдан <strong>гарантийный талон</strong>. Гарантийный
            талон является единственным документом, подтверждающим право на
            гарантийный ремонт и обслуживание приобретенного оборудования. В
            случае отсутствия данного талона претензии не принимаются. Сроки и
            условия гарантийного ремонта на различные изделия могут
            варьироваться. Детальная информация о сроках и условии гарантии
            конкретного товара указана в гарантийном талоне.
          </p>
          <h3>Условия гарантии</h3>

          <p>Гарантия не распространяется на:</p>
          <p></p>
          <ul>
            <li>естественный износ деталей,</li>
            <li>
              механические повреждения, загрязнения или поломки, возникшие по
              вине покупателя,
            </li>
            <li>
              неисправности, появившиеся в результате нецелевого использования
              либо неправильной эксплуатации.
            </li>
            <li>
              повреждения, возникшие в результате действий третьих лиц либо
              обстоятельств непреодолимой силы.
            </li>
          </ul>
          <p></p>
          <a name="dokumenty-podtverzhdayushchie-garantiyu"></a>
          <h3>Документы, подтверждающие гарантию</h3>

          <p>
            Подтверждением гарантийных обязательств служит гарантийный талон
            производителя.
          </p>
          <p>Гарантийный талон должен содержать:</p>
          <p></p>
          <ul>
            <li>название модели,</li>
            <li>серийный номер товара,</li>
            <li>гарантийный срок,</li>
            <li>дату продажи.</li>
          </ul>
          <p></p>

          <h2>Получение заказа</h2>

          <p>В момент получения заказа необходимо проверить:</p>
          <p></p>
          <ul>
            <li>внешний вид изделия,</li>
            <li>комплектность,</li>
            <li>отсутствие механических повреждений,</li>
            <li>правильность оформления гарантийных документов.</li>
          </ul>
          <p></p>

          <p>
            Своей подписью в Акте приема-передачи и Гарантийном талоне вы
            подтверждаете, что согласились с целостностью товара, а также
            ознакомились с условиями эксплуатации.
          </p>
          <p>
            Пожалуйста, сохраняйте гарантийный талон до окончания гарантийного
            срока.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Guarantees
