window.log = function f() {
	log.history = log.history || [];
	log.history.push(arguments);
	if (this.console) {
		var args = arguments,
			newarr;
		args.callee = args.callee.caller;
		newarr = [].slice.call(args);
		if (typeof console.log === 'object') log.apply.call(console.log, console, newarr);
		else console.log.apply(console, newarr);
	}
};
(function(a) {
	function b() {}
	for (var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), d; !!(d = c.pop());) {
		a[d] = a[d] || b;
	}
})
(function() {
	try {
		console.log();
		return window.console;
	} catch (a) {
		return (window.console = {});
	}
}());

$(document).ready(function() {
	contactForm();
	fancybox();
	setDateYear();
});

function contactForm() {
	$("#contact_form").submit(function() {
		$.post('contact_form.php', {
				name: $('#name').val(),
				email: $('#email').val(),
				organization: $('#organization').val(),
				message: $('#message').val(),
				contactFormSubmitted: 'yes'
			},
			function(data) {
				$("#formResponse").html(data).fadeIn('100');
				//reset feilds
				$('#name').val('Name');
				$('#email').val('Email');
				$('#organization').val('Organization');
				$('#message').val('Message');
			}, 'text');
		return false;
	});

	$('#name').focus(function() {
		var name = $('#name').val();
		if (name === 'Name') {
			$(this).val('');
		}
	});

	$('#name').blur(function() {
		var name = $('#name').val();
		if (name === '') {
			$(this).val('Name');
		}
	});

	$('#email').focus(function() {
		var name = $('#email').val();
		if (name === 'Email') {
			$(this).val('');
		}
	});

	$('#email').blur(function() {
		var name = $('#email').val();
		if (name === '') {
			$(this).val('Email');
		}
	});

	$('#phone').focus(function() {
		var name = $('#phone').val();
		if (name === 'Phone') {
			$(this).val('');
		}
	});

	$('#phone').blur(function() {
		var name = $('#phone').val();
		if (name === '') {
			$(this).val('Phone');
		}
	});

	$('#organization').focus(function() {
		var name = $('#organization').val();
		if (name === 'Organization') {
			$(this).val('');
		}
	});

	$('#organization').blur(function() {
		var name = $('#organization').val();
		if (name === '') {
			$(this).val('Organization');
		}
	});

	$('#message').focus(function() {
		var name = $('#message').val();
		if (name === 'Message') {
			$(this).val('');
		}
	});

	$('#message').blur(function() {
		var name = $('#message').val();
		if (name === '') {
			$(this).val('Message');
		}
	});

}


function fancybox() {
	$("a.portfolio").click(function() {
		$.fancybox([{
				'href': 'img/portfolio/drDeign_website.jpg',
				'title': 'Dr. Deign Author & Speaker - <a href="http://www.drdeign.com" target="_blank">View Site</a>'

			},

			{
				'href': 'img/portfolio/springfield_live.jpg',
				'title': 'Springfield, OH community website - website design'
			},

			{
				'href': 'img/portfolio/wearewireless_homepage.jpg',
				'title': 'We Are Wireless Verizon Wireless Retailer - website design'
			},

			{
				'href': 'img/portfolio/ymca_website.jpg',
				'title': 'Local YMCA Branch - website design'
			},

			{
				'href': 'img/portfolio/IVH_Webiste_v2.jpg',
				'title': 'Irvin House Vineyard Domestic Winery in Charleston, SC - website design'
			},

			{
				'href': 'img/portfolio/waveland_website_home.jpg',
				'title': 'Waveland Advocacy Group - website design'
			}

		], {
			'type': 'image'
		});
		return false;
	});

}

function setDateYear() {
	var year = new Date();
	$('#curYear').html(year.getFullYear());
}
