function initTabs(elem) {
	let tabs = elem;

	let prevActiveTabs = tabs.querySelector('.tabs__link .active');
	let tabsActiveContent = tabs.querySelector('.tabs__content [data-tabs-content-id="' + prevActiveTabs.getAttribute('data-tabs-content-id') + '"]');

	tabsActiveContent.classList.add('active');

	function showTabsContent(e) {
		let target = e.target;

		if(target.tagName != 'A') return;
		e.preventDefault();

		let str = '.tabs__content [data-tabs-content-id="' + prevActiveTabs.getAttribute('data-tabs-content-id') + '"]';
		let prevActiveContentTabs = tabs.querySelector(str);

		if(prevActiveTabs) {
			prevActiveTabs.classList.remove('active');
			prevActiveContentTabs.classList.remove('active');
		}

		target.classList.add('active');

		let tabsContentId = target.getAttribute('data-tabs-content-id');
		let tabsContentItem = tabs.querySelectorAll('.tabs__content__item');

		for (var i = tabsContentItem.length - 1; i >= 0; i--) {
			if(tabsContentItem[i].getAttribute('data-tabs-content-id') == tabsContentId) {
				tabsContentItem[i].classList.add('active');
			}
		};

		prevActiveTabs = target;

	}

	tabs.addEventListener('click', showTabsContent);
	
}

let tabs = document.querySelectorAll('.tabs')

for (var i = tabs.length - 1; i >= 0; i--) {
	initTabs(tabs[i]);
};


