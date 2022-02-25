# Cloud Operations Sample

## Deploy application to App Engine

```bash
gcloud app deploy ./packages/dispatch.yaml ./packages/frontend/app.yaml ./packages/orders/app.yaml ./packages/payments/app.yaml
```

## How to test application

1. Deploy application to App Engine
1. Visit main page of the application (`/`) and place order
1. Copy order ID
1. Make request to payments endpoint with order ID

### Sample Payments request

Non-traced request:

```bash
curl -X POST -d '{ "data": { "order": { "id": "<ORDER_ID>" } } }' -H 'Content-type: application/json' <APP_ENGINE_URL>/payments/
```

Force request tracing:

```bash
curl -X POST -d '{ "data": { "order": { "id": "<ORDER_ID>" } } }' -H 'Content-type: application/json' -H 'X-Cloud-Trace-Context: <TRACE_ID>/1;o=1' <APP_ENGINE_URL>/payments/
```

```bash
curl -X POST -d '{ "data": { "order": { "id": "77b21629-0b88-4864-b766-70da1f307ea3" } } }'-H 'X-Cloud-Trace-Context: 04485859961f1d4bfa955c88e566ffdb/1;o=1' -H 'Content-type: application/json' https://training-ora-maciejborowy1.ey.r.appspot.com/payments/
```

