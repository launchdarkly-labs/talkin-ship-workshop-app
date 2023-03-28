resource "launchdarkly_feature_flag" "admin_access" {
  project_key = launchdarkly_project.toggle_store_demo.key
  key         = "adminMode"
  name        = "Flag for admin access"
  description = "Allows user to be able to view admin portal for inventory and orders"
  tags        = ["terraform-managed"]
  temporary   = true

  variation_type = "boolean"
  variations {
    value = true
    name  = "Admin screen enabled"
  }
  variations {
    value = false
    name  = "Admin screen disabled"
  }
  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

resource "launchdarkly_feature_flag" "store_enabled" {
  project_key = launchdarkly_project.toggle_store_demo.key
  key         = "storeEnabled"
  name        = "Enable the Toggle Store"
  description = "Turn on our brand new Toggle Store component"
  tags        = ["terraform-managed"]
  temporary   = true

  variation_type = "boolean"
  variations {
    value = true
    name  = "Web store enabled"
  }
  variations {
    value = false
    name  = "Web store disabled"
  }
  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

resource "launchdarkly_feature_flag" "stripe_routes" {
  project_key = launchdarkly_project.toggle_store_demo.key
  key         = "enableStripe"
  name        = "New Stripe API Routes"
  description = "This flag enables communication with the Stripe API on the server"
  tags        = ["terraform-managed"]
  temporary   = true

  variation_type = "boolean"
  variations {
    value = true
    name  = "Stripe API route enabled"
  }
  variations {
    value = false
    name  = "Stripe API disabled"
  }
  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

resource "launchdarkly_feature_flag" "billing_method" {
  project_key = launchdarkly_project.toggle_store_demo.key
  key         = "billing"
  name        = "Enable the new billing component"
  description = "This flag changes the webstore to use the Stripe checkout instead of self-hosted"
  tags        = ["terraform-managed"]
  temporary   = true

  variation_type = "boolean"
  variations {
    value = true
    name  = "Enabled Stripe Checkouts"
  }
  variations {
    value = false
    name  = "Use Contact Sales Form"
  }
  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

resource "launchdarkly_feature_flag" "database_testing" {
  project_key = launchdarkly_project.toggle_store_demo.key
  key         = "dbTesting"
  name        = "Database testing flag"
  description = "Change from self-hosted static file to Postgres database"
  tags        = ["terraform-managed"]
  temporary   = true

  variation_type = "string"
  variations {
    value = "postgres"
    name  = "Using the Postgres Database"
  }
  variations {
    value = "self hosted"
    name  = "Using the products.ts JSON file"
  }
  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

