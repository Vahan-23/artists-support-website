export type LegalDocument = {
  id: string;
  title: string;
  description: string;
  filename: string;
};

const DOCUMENTS_DIR = "/documents";

export function getDocumentHref(filename: string): string {
  return `${DOCUMENTS_DIR}/${encodeURIComponent(filename)}`;
}

export const legalDocuments: LegalDocument[] = [
  {
    id: "privacy-policy",
    title: "Политика конфиденциальности",
    description:
      "Порядок обработки и защиты персональных данных на сайте и в деятельности организации.",
    filename: "Политика кофиденциальности.pdf",
  },
  {
    id: "pd-regulation",
    title: "Положение об обработке персональных данных",
    description:
      "Локальный нормативный акт об обработке и защите персональных данных в АНО.",
    filename: "Положение об обработке ПД.pdf",
  },
  {
    id: "pd-consent",
    title: "Согласие на обработку персональных данных",
    description:
      "Форма согласия субъекта персональных данных на обработку его данных.",
    filename: "Согласие на обработку ПД.pdf",
  },
];

export const privacyPolicyDocument = legalDocuments[0]!;

export const privacyPolicyHref = getDocumentHref(
  privacyPolicyDocument.filename,
);
