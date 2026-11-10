/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'Data Zenix',
    position: 'Associate Data Scientist',
    url: 'https://datazenix.com',
    startDate: '2025-07-01',
    endDate: '2025-08-01',
    summary:
      'Built and shipped production data pipelines and ML models at a data science firm in Karachi.',
    highlights: [
      'Surfaced a linear correlation between GDP growth and external debt, and a 40% rising poverty trend, by building an end-to-end pipeline (Python, Pandas, NumPy) across five integrated economic indicators, then deploying findings via an interactive dashboard on GCP.',
      'Achieved a Car Price Prediction MAE of 1.0 using a Decision Tree Regressor with systematic feature engineering and hyperparameter tuning.',
      'Identified TV ad spend as the dominant sales driver (R²=0.897) by building a multi-channel Sales Prediction pipeline with OLS regression across 200 advertising records.',
    ],
  },
  {
    name: 'Sofnix Pvt. Ltd',
    position: 'Junior AI Engineer & Full Stack Developer',
    url: 'https://sofnix.com',
    startDate: '2024-07-01',
    endDate: '2024-11-01',
    summary:
      'Designed and shipped ML models, conversational AI systems, and backend infrastructure at a software firm in Islamabad.',
    highlights: [
      'Improved system efficiency by 20% by designing and deploying ML models for predictive analytics using Python and TensorFlow, exposing inference through REST API endpoints consumed by the production .NET Core backend.',
      'Boosted customer engagement by 15% by building conversational AI systems with LLM integration, handling intent classification, context management, and response generation via a microservices architecture.',
      'Reduced query latency by redesigning MySQL schemas and structuring efficient data ingestion workflows to support real-time model serving requirements.',
    ],
  },
];

export default work;
