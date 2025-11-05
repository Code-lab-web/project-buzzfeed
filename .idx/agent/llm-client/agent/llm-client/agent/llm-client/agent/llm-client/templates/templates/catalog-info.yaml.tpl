apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: '{{ repo_name }}'
  description: 'Documentation for the {{ repo_name }} project.'
  annotations:
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  owner: user:default/your-team
  lifecycle: production