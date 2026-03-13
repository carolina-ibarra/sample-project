import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [selectedTag, setSelectedTag] = useState('all')
  const [selectedSize, setSelectedSize] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/images/catalog.json')
      .then(response => response.json())
      .then(data => {
        setImages(data)
        setFilteredImages(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading images:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let filtered = images

    if (selectedTag !== 'all') {
      filtered = filtered.filter(img => img.tag === selectedTag)
    }

    if (selectedSize !== 'all') {
      filtered = filtered.filter(img => img.size === selectedSize)
    }

    setFilteredImages(filtered)
  }, [selectedTag, selectedSize, images])

  const allTags = ['all', ...new Set(images.map(img => img.tag))]
  const allSizes = ['all', ...new Set(images.map(img => img.size))]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-5">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-5">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Image Gallery</h1>

      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <label htmlFor="tag-filter" className="font-medium text-gray-600">Tag:</label>
          <select
            id="tag-filter"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm cursor-pointer min-w-[120px] hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag === 'all' ? 'All Tags' : tag}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="size-filter" className="font-medium text-gray-600">Size:</label>
          <select
            id="size-filter"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm cursor-pointer min-w-[120px] hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {allSizes.map(size => (
              <option key={size} value={size}>
                {size === 'all' ? 'All Sizes' : size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredImages.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500 text-base">No images match your filters</div>
        ) : (
          filteredImages.map(image => (
            <div key={image.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 px-4">
                <div className="text-base font-semibold text-gray-800 mb-2">{image.title}</div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 lowercase">{image.tag}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 lowercase">{image.size}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
