<script></script>

<section>
	<p>
		Это интерактивная инфографика, которая позволяет получить представление о российской внешней
		торговле товарами (без учета услуг, финансовых и других нетоварных операций). Здесь в виде
		графиков показаны суммы импорта и экспорта между Россией и другими странами, а также динамика
		изменения этих значений с 2000 по 2020 годы.
	</p>
	<details>
		<summary><span>Как пользоваться?</span></summary>
		<p>Данные с сайта UN Comtrade Database</p>
	</details>
	<details>
		<summary><span>Какой источник у данных?</span></summary>
		<p>
			Данные получены с использованием API сайта <a href="https://comtrade.un.org/"
				>UN Comtrade Database</a
			>.
		</p>
		<p>
			Для целей инфографики выбраны только те страны, импорт или экспорт которых с Россией за
			рассматриваемый период времени достигал 0.5% от общероссийского импорта или экспорта в
			какой-либо год.
		</p>
	</details>
</section>

<style>
	section {
		max-width: var(--main-column-width);
		text-align: left;
		margin: 3rem auto 3rem auto;
		font-size: 1rem;
		line-height: 1.5rem;
		padding: 0 1rem 0 1rem;
	}

	details {
		margin-bottom: 1rem;
		padding: 0;
	}

	details p {
        margin: 0.5rem 1.5rem;
	}

	summary {
		padding: 0.2rem 0.5rem;
	}

	summary {
		cursor: pointer;
	}

	summary span {
		background-color: var(--color-dark-50);
		outline: 1px solid var(--color-dark-light);
		padding: 0.1rem 0.3rem;
		border-radius: 1px;
	}
</style>
