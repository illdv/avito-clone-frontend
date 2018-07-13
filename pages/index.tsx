import React from 'react'
import Link from 'next/link'

import { withI18next } from '../common/lib/withI18next'

export default withI18next(['home', 'common'])(({ t, initialI18nStore }) => (
	<div>
		<h1>{t('welcome')}</h1>
		<p>{t('common:integrates_react-i18next')}</p>
		<Link href='/page2'>
			<a>{t('link.gotoPage2')}</a>
		</Link>
	</div>
))
