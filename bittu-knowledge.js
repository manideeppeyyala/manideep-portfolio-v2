// Bittu's knowledge layer: builds a plain-text knowledge base strictly from
// window.DEFAULT_CONTENT (the same data the site itself renders from — real
// resume/portfolio content, live-merged with admin edits by content-loader.js).
// Bittu is never allowed to say anything about Manideep that isn't derived
// from this object — see bittu.js for the matching/response logic.

function buildBittuKnowledge() {
  const d = window.DEFAULT_CONTENT;
  if (!d) return null;

  const skillsList = d.skills.map(s => `${s.category}: ${s.tags.join(", ")}`).join(" | ");
  const expList = d.experience.map(e =>
    `${e.role} at ${e.company} (${e.dateRange}, ${e.location}). ${e.desc} Key responsibilities: ${e.responsibilities.slice(0, 4).join(" ")}`
  ).join("\n");
  const projList = d.projects.map(p => `${p.title} — ${p.desc} Technologies: ${p.tags.join(", ")}.`).join("\n");
  const certList = d.certifications.map(c => `${c.title} (${c.org})${c.desc ? " — " + c.desc : ""}`).join("\n");
  const socialList = d.content.socials.map(s => `${s.platform}: ${s.handle} — ${s.url}`).join("\n");
  const statsList = d.socialStats.map(s => `${s.platform} ${s.label}: ${s.manualValue || "not set"}`).join("\n");

  return {
    name: d.hero.name,
    roles: d.hero.roles.join(", "),
    aboutBio: d.about.bio.map(p => p.replace(/<[^>]+>/g, "")).join(" "),
    exploring: d.about.exploring.join(", "),
    skillsList,
    expList,
    projList,
    certList,
    educationLine: `${d.education.degree} at ${d.education.school} (${d.education.dateRange}), ${d.education.extra}.`,
    educationProjects: d.education.projects.map(p => p.replace(/<[^>]+>/g, "")).join(" "),
    researchTitle: d.research.title,
    researchDesc: d.research.desc.replace(/<[^>]+>/g, ""),
    contactEmail: d.contact.email,
    contactPhone: d.contact.phone,
    contactLocation: d.contact.location,
    socialList,
    statsList,
    resumeHref: "assets/Peyyala_Manideep_Resume.pdf"
  };
}

window.getBittuKnowledge = buildBittuKnowledge;
