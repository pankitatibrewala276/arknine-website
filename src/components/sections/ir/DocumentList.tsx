/**
 * DocumentList
 * ------------
 * Purpose: List of downloadable PDF documents with date, title, download link.
 * Used on: IR Results, IR Announcements, IR Policies
 * Visual: table-wrap with date + title + download button per row
 * Generic: yes — works for results, announcements, and any PDF listing
 */
import { Download } from "lucide-react";

export interface DocumentItem {
  id: string;
  title: string;
  date: string;
  category?: string;
  documentUrl: string;
}

interface DocumentListProps {
  documents: DocumentItem[];
  showCategory?: boolean;
}

export function DocumentList({ documents, showCategory = false }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="card card-static" style={{ textAlign: "center", padding: "var(--space-12) var(--space-8)" }}>
        <p className="body-sm text-stone">No documents available.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Document</th>
            {showCategory && <th>Category</th>}
            <th style={{ width: "100px", textAlign: "right" }}>Download</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="text-stone" style={{ whiteSpace: "nowrap" }}>
                {doc.date}
              </td>
              <td style={{ fontWeight: 600 }}>{doc.title}</td>
              {showCategory && (
                <td>
                  <span className="badge badge-neutral">{doc.category}</span>
                </td>
              )}
              <td style={{ textAlign: "right" }}>
                <a
                  href={doc.documentUrl}
                  className="btn btn-ghost btn-sm btn-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${doc.title}`}
                >
                  <Download size={16} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
