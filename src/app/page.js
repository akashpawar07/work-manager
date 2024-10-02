
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Landing Page | Work Manager"
}

export default function Home() {
  return (
    <>
      <div className="flex flex-row h-[70px] items-center justify-around">
        <div className="">
          <h1 className="text-2xl">Work Manager</h1>
        </div>
        <div className="flex items-center gap-6">

          <Link href="/login" className="text-xl bg-blue-700 px-3 rounded-sm">Login</Link>
          <Link href="/register" className="text-xl bg-green-700 px-3 rounded-sm">Signup</Link>
        </div>

      </div>

      <div className="flex flex-col-reverse md:flex-row md:gap-4 md:mt-4 md:w-[100%] md:h-[95vh]">
        <div className="p-6  w-full md:w-[48%] md:h-[auto] ">

          <div className="flex flex-col gap-3 items-center justify-center">
            <h1 className="text-5xl mt-5 text-blue-500">The Friend of Corporate</h1>
            <h2 className="text-4xl text-blue-500">Focuses on project monitoring</h2>
            <p>hello user this is simple work manager web application, </p>
          </div>

          <div className="p-1 md:p-4 mt-20">
            Welcome to work Manager, your comprehensive platform for streamlined project management. This intuitive web application empowers you to track progress, foster collaboration, and drive development. Upon logging in, you'll be directed to your personalized profile page, where you can effortlessly create new projects by providing essential details such as project name, description, and submission deadline.

            <ol className="list-disc p-4">
              <li>Automated screenshot capture for real-time project visibility  </li>
              <li>Centralized project management through the Profile menu</li>
              <li>Convenient access to all projects with a single click on 'My Projects'</li>
            </ol>
          </div>

        </div>
        <div className="p-2 mt-6 w-full h-auto md:p-1 md:w-[48%] md:h-[95%] bg-gray-800 md:bg-blue-600 rounded-lg md:rounded-lg">
          <Spline
          className="rounded-lg"
            scene="https://prod.spline.design/lAiXNyB0ozlcF5uD/scene.splinecode"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4 w-[100%] p-6">
      work Manager is designed to enhance your productivity, facilitate seamless communication, and provide actionable insights. Explore our platform's capabilities today and discover a more efficient way to manage your projects.

      </div>

      <Footer />
    </>
  )
}
