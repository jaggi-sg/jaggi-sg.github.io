var portfolioApp = angular.module('portfolioApp',[]);

portfolioApp.controller('profileCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.imagePath = 'images/header.jpeg';
	$scope.linkedin = 'images/social/linkedin.ico';
	$scope.skype = 'images/social/skype.ico';
	var navigation = [];

	var navMenu = function(menuName, clickLocation) {
		this.menuName = menuName;
		this.clickLocation = clickLocation;
	};

	navigation.push(new navMenu("Home", "#home"));
	navigation.push(new navMenu("About", "#about"));
	navigation.push(new navMenu("Education", "#education"));
	navigation.push(new navMenu("Experience", "#experience"));
	navigation.push(new navMenu("Skills", "#skills"));
	navigation.push(new navMenu("Projects", "#projects"));
	navigation.push(new navMenu("Contact", "#contact"));
	/*$scope.navMenu = ['Home', 'About', 'Education', 'Projects', 'Contact'];*/

	$scope.gotoMenu = function(element, $event){
		$scope.activeMenu = $scope.navMenu[0];
		var $menuDisplay = $('html,body');
		if($event){
			$event.preventDefault();
		}
		$menuDisplay.animate({
			scrollTop: $(element).offset().top
		}, 500);
		$scope.activeMenu = element;
		/* $(event.target).addClass('active');	*/
	};

	$scope.navMenu = navigation;

	var experience = [];

	var expMenu = function(no, company, place, from, to, role, team, responsibilities) {
		this.no = no;
		this.company = company;
		this.place = place;
		this.from = from;
		this.to = to;
		this.role = role;
		this.team = team;
		this.responsibilities = responsibilities;
	}

	var exp1 = new expMenu(1, "Infosys Limited", "Bangalore, India", "Sep 2011", "Dec 2013", "System Engineer", ["Air Liquide", "Dupont"],"Work on Salesforce CRM to manage users, accounts, opportunities");
	exp1.desc = ["Worked on the complete migration of Air Liquide Healthcare SFDC instance","Use Salesforce SOAP API for database interface with salesforce","Develop apex classes/triggers using Apex and Visualforce","Create workflows, approvals, triggers, validation rules","Certified Salesforce DEV401 Developer"];
	exp1.tech = "Java, Salesforce, Apex, Visualforce, SQL, Oracle, PL/SQL, HTML5, JavaScript, REST, SOAP"
	// exp1.desc2 = ;

	var exp2 = new expMenu(2, "Capital One", "Richmond, VA", "Sep 2016", "Current", "Developer",[],"Worked towards modernizing the Card Embossing applications to cloud");
	exp2.desc = ["Develop highly scalable spring boot micro-services and deploy on AWS","Perform AMI rehydration of EC2 instances on East and West regions","Minimum impact traffic switch of applications across AWS regions","Use Apache Spark for cluster handling of data and to archive data across databases in MongoDB"];
	exp2.tech = "Java, MongoDB, Docker, AWS, Mesos, Marathon, Kafka, Zookeeper, Spark, AngularJS, HTML5, JavaScript"
	experience.push(exp2);
	experience.push(exp1);

	$scope.experience = experience;

	var education = [];

	var eduMenu = function(gpa, university, place, yearFrom, yearTo, degree, major, type) {
		this.gpa = gpa;
		this.university = university;
		this.place = place;
		this.yearFrom = yearFrom;
		this.yearTo = yearTo;
		this.degree = degree;
		this.major = major;
		this.type = type;
	}

	education.push(new eduMenu(3.6, "University of Texas, Arlington", "Arlington, TX, USA", "Jan 2014", "Dec 2015", "Master's", "Computer Science", "pgcourse"));
	education.push(new eduMenu(3.7, "Visvesvaraya Technological University", "Bangalore, India", "Sept 2007", "June 2011", "Bachelor's", "Information Science", "ugcourse"));

	$scope.eduMenu = education;

	$scope.gotoCourse = function(element){
		console.log(element);
		if(element == null) {
			$scope.courses = [];
		}
		else if(element == "Master's") {
			$scope.courses = ['Secure Programming','Cloud Computing','Web Data XML','Software Engineering','Wireless Networks','Distributed Systems','Design & Analysis of Algorithms','Computer Networks','Database Systems'];
		}
		else if(element == "Bachelor's") {
			$scope.courses = ['Algorithms','Java and J2EE','Computer Networks I/II', 'Database Management Systems','Data Structures','Compiler Design','Operating Systems','Object Oriented Model & Design','OOP with C++','Computer Organization','Software Architecture','Information & Network Security','Data Mining'];
		}
	};

	/*$scope.pgCourses = ['Secore Programming','Cloud Computing','Web Data XML','Software Engineering','Wireless Networks','Distributed Systems','Design & Analysis of Algorithms','Computer Networks','Database Systems'];
    $scope.ugCourses = ['Algorithms','Java','NetworksI/II', 'Database'];*/

	$scope.contact = {
			name: "Jagadish Shivanna",
			phone: "682-582-3836",
			email: "jagadish030@gmail.com",
			place: "Richmond, VA",
			linkedin: "http://www.linkedin.com/in/jaggisg",
			skype: "jaggi.sg11"
	};

	$scope.webProjUrl = "https://bitbucket.org/jaggi-sg/web-projects/src/";
	$scope.cloudProjUrl = "https://bitbucket.org/jaggi-sg/cloud-computing-projects/src/";
	$scope.home = "Bangalore, India";
	$scope.livesin = "Richmond, VA";
	$scope.aboutCurrent = "Seeking full-time positions as Software Engineer";
	$scope.resume = "docs/jagadishshivanna.pdf";
	$scope.aboutDetails = "Hi, I'm Jagadish Shivanna, Computer Science graduate from University of Texas, Arlington working as Developer at Capital One, Richmond VA. Scroll through this page to know more about me, my skills and projects";

	$http.get('application.json').success(function(data) {
		$scope.projects = [];
		$scope.webProjs = [];
		$scope.cloudProjs = [];
		$scope.social = [];
		$scope.skills = [];
		angular.forEach (data.projects, function(value, key) {
			$scope.projects.push(value);
		}
		)
		angular.forEach (data.webProjs, function(value, key) {
			$scope.webProjs.push(value);
		}
		)
		angular.forEach (data.cloudProjs, function(value, key) {
			$scope.cloudProjs.push(value);
		}
		)
		angular.forEach (data.social, function(value, key) {
			$scope.social.push(value);
		}
		)
		angular.forEach (data.skills, function(value, key) {
			$scope.skills.push(value);
		}
		)
		/*
		 */
	});

}]);

portfolioApp.directive("scroll", function ($window) {
	return function(scope, element, attrs) {
		angular.element($window).bind("scroll", function() {
			var homeEnd = $("#homeEnd");
			if (this.pageYOffset>=homeEnd[0].offsetTop) {
				scope.boolNav = true;
				/*console.log('Scrolled below header.');*/
			} else {
				scope.boolNav = false;
				/*console.log('Header is in view.');*/
			}
			scope.$apply();
		});
	};
});

/*portfolioApp.config( ['$compileProvider',function( $compileProvider ){
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(skype):/);
        }]);*/
