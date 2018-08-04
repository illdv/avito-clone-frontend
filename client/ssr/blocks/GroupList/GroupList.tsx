import * as React from 'react';
import { adGroup } from 'client/ssr/pages/Category';
import Ads from 'client/ssr/blocks/ads/Ads';

interface IGroupList {
	groupList: adGroup[];
}

const GroupList: React.SFC<IGroupList> = ({ groupList }) => {
	// ToDO: Fix Warning Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.
	return (
		<>
			{
				groupList.map(category => (
					category.ads.length > 0
					&& <Ads
							title={category.title}
							ads={category.ads}
							key={category.id}
						/>
				))
			}
		</>
	);
};

export default GroupList;