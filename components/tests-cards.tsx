"use client"

import { AdhdChecklist } from "@/components/assessments/adhd-checklist"
import { AQ50 } from "@/components/assessments/aq50"
import { VVIQ } from "@/components/assessments/vviq"
import { TAS20 } from "@/components/assessments/tas20"
import { CATQ } from "@/components/assessments/catq"
import { MDS16 } from "@/components/assessments/mds16"
import { GSQ } from "@/components/assessments/gsq"
import { OEQ2 } from "@/components/assessments/oeq2"
import { ICQEV } from "@/components/assessments/icqev"
import { FeatureCardGrid, type FeatureCard } from "@/components/feature-card-grid"

const CARDS: FeatureCard[] = [
  {
    kind: "modal",
    title: "ADHD Symptom Checklist",
    category: "DSM-5 + community",
    footerLabel: "Take checklist",
    modalTitle: "ADHD Symptom Checklist",
    modalSubtitle: "DSM-5 criteria · community-reported symptoms.",
    content: <AdhdChecklist />,
  },
  {
    kind: "modal",
    title: "AQ-50",
    category: "Autism Spectrum Quotient",
    footerLabel: "Take screen",
    modalTitle: "AQ-50: Autism Spectrum Quotient",
    modalSubtitle: "50-item screening questionnaire · Baron-Cohen et al., 2001.",
    content: <AQ50 />,
  },
  {
    kind: "modal",
    title: "CAT-Q",
    category: "Camouflaging traits",
    footerLabel: "Take screen",
    modalTitle: "CAT-Q: Camouflaging Autistic Traits Questionnaire",
    modalSubtitle: "25 items across compensation, masking, and assimilation.",
    content: <CATQ />,
  },
  {
    kind: "modal",
    title: "TAS-20",
    category: "Alexithymia scale",
    footerLabel: "Take scale",
    modalTitle: "TAS-20: Toronto Alexithymia Scale",
    modalSubtitle: "20 items measuring difficulty identifying and describing feelings.",
    content: <TAS20 />,
  },
  {
    kind: "modal",
    title: "VVIQ",
    category: "Mental imagery",
    footerLabel: "Take questionnaire",
    modalTitle: "VVIQ: Vividness of Visual Imagery Questionnaire",
    modalSubtitle: "Rate the vividness of imagined scenes.",
    content: <VVIQ />,
  },
  {
    kind: "modal",
    title: "MDS-16",
    category: "Maladaptive daydreaming",
    footerLabel: "Take screen",
    modalTitle: "MDS-16: Maladaptive Daydreaming Scale",
    modalSubtitle: "16 items screening for immersive daydreaming.",
    content: <MDS16 />,
  },
  {
    kind: "modal",
    title: "GSQ",
    category: "Sensory processing",
    footerLabel: "Take questionnaire",
    modalTitle: "GSQ: Glasgow Sensory Questionnaire",
    modalSubtitle:
      "Hyper- and hyposensitivity across visual, auditory, and other modalities.",
    content: <GSQ />,
  },
  {
    kind: "modal",
    title: "OEQ-II",
    category: "Overexcitabilities",
    footerLabel: "Take questionnaire",
    modalTitle: "OEQ-II: Overexcitabilities Questionnaire",
    modalSubtitle:
      "Five Dabrowskian overexcitabilities — psychomotor, sensual, intellectual, imaginational, emotional.",
    content: <OEQ2 />,
  },
  {
    kind: "modal",
    title: "ICQ-EV",
    category: "Inferential confusion",
    footerLabel: "Take questionnaire",
    modalTitle: "ICQ-EV: Inferential Confusion Questionnaire (Expanded Version)",
    modalSubtitle: "30-item measure of inferential confusion · Aardema et al., 2010.",
    content: <ICQEV />,
  },
]

export function TestsCards() {
  return <FeatureCardGrid cards={CARDS} modalSize="wide" />
}
