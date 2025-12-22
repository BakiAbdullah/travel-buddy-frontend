"use client";

import React, { useState } from "react";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  Tag,
  Search,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Travel Tips",
    "Destinations",
    "Adventure",
    "Culture",
    "Budget Travel",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Solo Travelers",
      excerpt:
        "Embarking on a solo journey? Discover the essential tips that will make your adventure safe, enjoyable, and unforgettable.",
      author: "Sarah Mitchell",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Travel Tips",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Hidden Gems of Southeast Asia",
      excerpt:
        "Move beyond the tourist trails and explore the breathtaking hidden destinations that most travelers miss in Southeast Asia.",
      author: "Mike Chen",
      date: "Dec 12, 2024",
      readTime: "7 min read",
      category: "Destinations",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      featured: true,
    },
    {
      id: 3,
      title: "How to Travel Europe on $50 a Day",
      excerpt:
        "Yes, it's possible! Learn the insider secrets to experiencing Europe's best cities without breaking the bank.",
      author: "Emma Rodriguez",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      category: "Budget Travel",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80",
      featured: false,
    },
    {
      id: 4,
      title: "The Ultimate Guide to Hiking Patagonia",
      excerpt:
        "From Torres del Paine to Fitz Roy, discover everything you need to know about trekking through South America's most stunning landscapes.",
      author: "Jake Thompson",
      date: "Dec 8, 2024",
      readTime: "10 min read",
      category: "Adventure",
      image:
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
      featured: false,
    },
    {
      id: 5,
      title: "Cultural Etiquette: Do's and Don'ts in Japan",
      excerpt:
        "Navigate Japanese culture with confidence. Learn the essential customs and etiquette that will help you blend in like a local.",
      author: "Yuki Tanaka",
      date: "Dec 5, 2024",
      readTime: "4 min read",
      category: "Culture",
      image:
        "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
      featured: false,
    },
    {
      id: 6,
      title: "Best Road Trip Routes in Australia",
      excerpt:
        "Hit the open road and explore Australia's most scenic drives, from the Great Ocean Road to the Outback's red center.",
      author: "Chris Murphy",
      date: "Dec 3, 2024",
      readTime: "8 min read",
      category: "Destinations",
      image:
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-10 container mx-auto">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-16 ">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl text-blue-50 max-w-2xl">
            Stories, tips, and inspiration from travelers around the world
          </p>
        </div>
      </div>

      <div className=" mx-auto py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "All" && !searchTerm && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-800">
                Featured Stories
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      height={200}
                      width={250}
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <button className="flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    height={200}
                    width={250}
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <button className="text-blue-600 font-medium text-sm hover:gap-2 flex items-center gap-1 transition-all">
                      Read
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
