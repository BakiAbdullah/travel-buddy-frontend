import { Compass, Globe, Heart, Star, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20 px-6">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Travel Buddy
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto">
              Connecting wanderers, creating memories, and making every journey
              unforgettable
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Travel Buddy was born from a simple belief: the best adventures
                are shared. We are on a mission to connect like-minded
                travelers, turn solo journeys into shared experiences, and build
                a global community of explorers.
              </p>
              <p className="text-lg text-gray-600">
                Whether you are seeking a companion for a weekend getaway or
                planning an epic cross-continental adventure, we are here to
                help you find your perfect travel match.
              </p>
            </div>
            <div className="bg-linear-to-br from-indigo-100 to-purple-200 rounded-3xl p-8 flex items-center justify-center">
              <Globe className="w-64 h-64 text-blue-600 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                Building authentic connections between travelers from all walks
                of life, creating a global family of explorers.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-linear-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Safety</h3>
              <p className="text-gray-600">
                Your security is our priority. We verify profiles and provide
                tools to ensure safe, trustworthy connections.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-linear-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Adventure
              </h3>
              <p className="text-gray-600">
                Encouraging exploration, cultural exchange, and stepping outside
                comfort zones to discover the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Story
          </h2>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <p className="text-lg text-gray-600 mb-4">
              Travel Buddy started in 2020 when our founder, backpacking solo
              through Southeast Asia, realized how many incredible people were
              traveling alone, wishing they had someone to share experiences
              with.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              What began as a simple Facebook group quickly grew into a thriving
              community of thousands. Today, we have helped connect travelers in
              over 150 countries, facilitating countless friendships and
              unforgettable adventures.
            </p>
            <p className="text-lg text-gray-600">
              From hiking the Inca Trail together to exploring Tokyo is hidden
              gems, our community proves that the journey is always better with
              a buddy by your side.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-linear-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Travelers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100K+</div>
              <div className="text-blue-100">Connections Made</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">15K+</div>
              <div className="text-blue-100">Trips Shared</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Find Your Travel Buddy?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of adventurers who have discovered that the best
            journeys are the ones we take together.
          </p>
          <button className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
            Start Your Adventure
          </button>
        </div>
      </section>
    </div>
  );
}
