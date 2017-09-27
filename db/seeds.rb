# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# bars = HTTParty.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+Philadelphia&key=AIzaSyBoKBYjQZEa8J51cde3e3WWBpZfbr8KSZc')
#
# tally = 0
# 20.times do
#   if Bar.find_by_name(bars.results[tally].name).nil?
#     BAr.create(
#       name: bars.results[tally].name,
#       address: bars.results[tally].formatted_address,
#       coords: bars.results[tally].geometry.location,
#       hours: bars.results[tally]
#     )
#   end
# end

Bar.destroy_all

require 'open-uri'
doc = Nokogiri::HTML(open('http://philly.thedrinknation.com/specials'))

tally = 5
45.times do
  Bar.create(
    name: doc.xpath('//h2//a')[tally].children.text.delete("\n").strip,
    address: doc.css('div[class=barMeta]')[tally].children[2].text.to_s.delete("\n").gsub(/\([^)]+\)\s+/,'').strip,
    phone_number: doc.css('div[class=barMeta]')[tally].children[5].text.delete("<br/>").strip,
    website: doc.css('div[class=barMeta]')[tally].children[7].text.delete("\n").strip,
    happy_hour_info: doc.css('div[class=barMeta]')[tally].children[9].text.delete("\n").strip.gsub(/\s+/, ' ')
  )
  tally = tally + 5
end
