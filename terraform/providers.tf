terraform {
  required_providers {
    launchdarkly = {
      source  = "launchdarkly/launchdarkly"
      version = "~> 2.0"
    }
    stripe = {
      source  = "lukasaron/stripe"
      version = "1.6.3"
    }
  }
}

# Configure the LaunchDarkly provider
provider "launchdarkly" {
  access_token = var.launchdarkly_access_token
}

provider "stripe" {
  api_key = var.stripe_api_key
}
