import React from 'react'
import Link from 'next/link'

import { withI18next } from '../common/lib/withI18next'

export default withI18next(['page2', 'common'])(({ t, initialI18nStore }) => (
	<div>
		<h1>{t('welcomePage2')}</h1>
		<p>{t('common:integrates_react-i18next')}</p>
		<Link href='/'>
			<a>{t('link.gotoPage1')}</a>
		</Link>
	</div>
));