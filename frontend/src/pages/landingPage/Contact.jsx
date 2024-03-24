
const Contact = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/2 md:mr-4 mb-4 md:mb-0">
            <p className="text-lg mb-4">Have questions or need assistance? Feel free to reach out to us!</p>
            <p className="text-lg">Email: contact@foodchop.com</p>
            <p className="text-lg">Phone: +2348068304340</p>
          </div>
          <div className="md:w-1/2 md:ml-4">
            <form>
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 mb-4 placeholder-gray-500 border rounded-md focus:outline-none focus:border-primary" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-2 mb-4 placeholder-gray-500 border rounded-md focus:outline-none focus:border-primary" />
              <textarea placeholder="Your Message" rows="5" className="w-full px-4 py-2 mb-4 placeholder-gray-500 border rounded-md focus:outline-none focus:border-primary"></textarea>
              <button type="submit" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary focus:outline-none focus:bg-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
