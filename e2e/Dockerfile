FROM mcr.microsoft.com/playwright:v1.53.0-noble

WORKDIR /app

# Initialize npm and install necessary packages
RUN npm init -y
RUN npm install @playwright/test
RUN npm install @types/node
RUN npm install dotenv  

# Copy your playwright config and tests
COPY playwright.config.ts /app/playwright.config.ts
COPY tests/ /app/tests/

CMD ["npx", "playwright", "test"]
