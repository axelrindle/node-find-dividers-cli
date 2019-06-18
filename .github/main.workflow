workflow "Publish on release" {
  on = "release"
  resolves = ["Publish to npm"]
}

action "Publish to npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
}
