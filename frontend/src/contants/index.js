import { fresh, delivery, fast, order, wallet  } from "../assets/icons";
// import { avatar1, avatar2, avatar3 } from "../assets/images";

// NAVIGATION 
export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#training", label: "Offer" },
    { href: "#training", label: "Service" },
    { href: "#conference", label: "Order" },
    { href: "#courses", label: "Menu" },
];

//PROFESSIONAL TEACHERS FEATURES
export const features = [
    {
        icon: fast,
        name: "Fast Delivery",
        about: 'The Food  will be delievred to your home within 1-2 Hours of your ordering.'

    },
    {
        icon: fresh,
        name: "Fresh Food",
        about: "Your Food will be Delivered 100% fresh to your home we don't deliver stale food."
    },
    {
        icon: delivery,
        name: "Free Delivery",
        about: "Your food delivery is absolutely free, just order and enjoy"
    }
    ];


export const howItWorks = [
    {
        id: '1',
        icon: wallet,
        header: `Connect Your Wallet`,
        content: `Sign up for an account and create a personalized profile showcasing your teaching qualifications, experience, and expertise.`
    },
    // {
    //     id: '2',
    //     header: `Explore Teaching Opportunities`,
    //     content: `Browse through a wide range of teaching vacancies posted by schools across various locations`
    // },
    {
        id: '2',
        icon: order,
        header: `Order`,
        content: `Discover teaching positions that match your interests and qualifications, and submit your application directly through the platform.`
    },
    // {
    //     id: '4',
    //     header: `Communicate with Schools`,
    //     content: `Engage in direct communication with school administrators through our messaging platform to clarify doubts, schedule interviews, and negotiate terms.`
    // },
    {
        id: '3',
        icon: delivery,
        header: ` Wait for delivery`,
        content: `Prepare for interviews by accessing resources and tips on effective interview techniques, teaching demos, and professional presentation.`
    },
    // {
    //     id: '4',
    //     icon: four,
    //     header: ` Get Hired`,
    //     content: `Successfully navigate the recruitment process and secure your desired teaching position.`
    // },
    // {
    //     id: '7',
    //     header: ` Provide Feedback`,
    //     content: `Share your experience and provide feedback on the recruitment process, helping us continually improve and enhance the platform.`
    // },
    // {
    //     id: '8',
    //     header: ` Grow Your Career`,
    //     content: `Once hired, continue to engage with the Professional Teacher Hub community to access professional development opportunities, networking events, and resources to support your ongoing career growth and success.`
    // },
];


