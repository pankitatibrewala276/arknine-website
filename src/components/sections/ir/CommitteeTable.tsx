/**
 * CommitteeTable
 * --------------
 * Purpose: Display committee membership in a table format.
 * Used on: IR Governance page
 * Visual: table-wrap with name, designation, and role in committee
 */
export interface CommitteeMember {
  name: string;
  designation: string;
  role: string; // e.g. "Chairperson", "Member"
}

interface CommitteeTableProps {
  committeeName: string;
  members: CommitteeMember[];
}

export function CommitteeTable({ committeeName, members }: CommitteeTableProps) {
  return (
    <div style={{ marginBottom: "var(--space-8)" }}>
      <h3 style={{ marginBottom: "var(--space-4)" }}>{committeeName}</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Committee Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{member.name}</td>
                <td className="text-stone">{member.designation}</td>
                <td>
                  <span
                    className={`badge ${member.role === "Chairperson" ? "badge-primary" : "badge-neutral"}`}
                  >
                    {member.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
