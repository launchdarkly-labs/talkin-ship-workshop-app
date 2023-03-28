variable "launchdarkly_access_token" {
  type        = string
  description = "The Access Token for our LaunchDarkly account"
  default     = ""
  sensitive   = true
}

variable "stripe_api_key" {
  type        = string
  description = "Access key for Stripe"
  default     = ""
  sensitive   = true
}
