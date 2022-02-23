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
curl -X POST -d '{ "data": { "order": { "id": "d6bd55cd-c494-47bb-bfb6-f00c721ac4c4" } } }' -H 'Content-type: application/json' -H 'X-Cloud-Trace-Context: <TRACE_ID>/1;o=1' https://training-ora-maciejborowy1.ey.r.appspot.com/payments/
```

