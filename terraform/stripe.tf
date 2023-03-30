resource "stripe_product" "classic_toggle" {
  id          = 1
  name        = "Classic Toggle"
  description = "A simple, wooden toggle for any coat!"
  metadata    = { "product_id" = "Classic Toggle" }

}

resource "stripe_price" "classic_toggle_price" {
  product     = stripe_product.classic_toggle.id
  currency    = "usd"
  unit_amount = 200
}

resource "stripe_product" "fancy_toggle" {
  id          = 2
  name        = "Fancy Toggle"
  description = "Looking for some new flair? Look no further!"
  metadata    = { "product_id" = "Fancy Toggle" }

}

resource "stripe_price" "fancy_toggle_price" {
  product     = stripe_product.fancy_toggle.id
  currency    = "usd"
  unit_amount = 500
}

resource "stripe_product" "plastic_toggle" {
  id          = 3
  name        = "Plastic Toggle"
  description = "When durability is your main concern, plastic is there."
  metadata    = { "product_id" = "Plastic Toggle" }

}

resource "stripe_price" "plastic_toggle_price" {
  product     = stripe_product.plastic_toggle.id
  currency    = "usd"
  unit_amount = 100
}

resource "stripe_product" "metal_toggle" {
  id          = 4
  name        = "Metal Toggle"
  description = "For those who need a little more flash from their toggles."
  metadata    = { "product_id" = "Metal Toggle" }

}

resource "stripe_price" "metal_toggle_price" {
  product     = stripe_product.metal_toggle.id
  currency    = "usd"
  unit_amount = 1000
}

resource "stripe_product" "bulk_toggle" {
  id          = 5
  name        = "Bulk Toggles"
  description = "Value Pack! Prefect for when you need a lot of toggles!"
  metadata    = { "product_id" = "Bulk Toggles" }

}

resource "stripe_price" "bulk_toggle_price" {
  product     = stripe_product.bulk_toggle.id
  currency    = "usd"
  unit_amount = 1500
}

resource "stripe_product" "corded_toggle" {
  id          = 6
  name        = "Corded Toggle"
  description = "Toggle and cord combo set! Cord not included."
  metadata    = { "product_id" = "Corded Toggle" }

}

resource "stripe_price" "corded_toggle_price" {
  product     = stripe_product.corded_toggle.id
  currency    = "usd"
  unit_amount = 500
}

resource "stripe_product" "historic_toggle" {
  id          = 7
  name        = "Historic Toggle"
  description = "Perfect for whaling outings, definitely not whale bone..."
  metadata    = { "product_id" = "Historic Toggle" }

}

resource "stripe_price" "historic_toggle_price" {
  product     = stripe_product.historic_toggle.id
  currency    = "usd"
  unit_amount = 2500
}

resource "stripe_product" "horn_toggle" {
  id          = 8
  name        = "Horn Toggle"
  description = "We are not liable for horn toggle related injuries, buyer beware."
  metadata    = { "product_id" = "Horn Toggle" }

}

resource "stripe_price" "horn_toggle_price" {
  product     = stripe_product.horn_toggle.id
  currency    = "usd"
  unit_amount = 5000
}




