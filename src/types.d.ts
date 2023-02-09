
declare global {
  interface Column {
    label: string
    key: string
    sort: null | string
  }

  interface APIResponse {
    stats: Stats
    tags: Tag[]
    criteria: Criterion[]
    helpers: Helper[]
  }

  interface Criterion {
    id: number
    type: string
    label: string
    weight: string
    options: Option[]
  }

  interface Option {
    key: string
    value: Value
  }

  interface Helper {
    helperId: number
    firstname: string
    lastname: string
    email: Email
    profilePictureUrl: null | string
    availability: Availability
    relations: number
    points: number
    status: Status
    joinedOn: Date | null
    lastSeen: Date | null
    tagIds: any[]
    userCriteria: UserCriterion[]
  }

  interface UserCriterion {
    criteriaId: number
    answerKey: null | string
    value: Value | null
  }

  interface Stats {
    helpersCount: number
    variationHelpersLastMonth: number
    helpersInvitedCount: number
  }

  interface Tag {
    id: number
    name: string
  }

  enum BadgeColor {
    Valid = 'valid',
    Invalid = 'invalid',
    Warning = 'warning',
    Info = 'info',
    Unknown = '',
  }

  enum Availability {
    Available = 'available',
    Busy = 'busy',
    NotAvailable = 'not-available',
    Surbooked = 'surbooked',
  }

  enum Status {
    Invited = 'invited',
    Joined = 'joined',
    OptedOut = 'opted-out',
  }

  enum Email {
    TestTestCOM = 'test@test.com',
  }

  enum Value {
    BTSOpticienLunetierEnAlternance = 'BTS Opticien Lunetier en alternance',
    BTSOpticienLunetierEnTempsPlein = 'BTS Opticien Lunetier en temps plein',
    BachelorDeManagerEnOptique = 'Bachelor de Manager en Optique',
    DiplômeOpticienFormationÀDistance = 'Diplôme Opticien formation à distance',
    Etudiant = 'Etudiant(e)',
    EtudiantBTSOL = 'Etudiant(e) BTS OL',
    LicenceProfessionnelleOptique = 'Licence Professionnelle d\'Optique',
    Lyceen = 'Lycéen(ne)',
    PrepaOptiqueEnAlternance = 'Prépa Optique en alternance',
    PrepaOptiqueEnTempsPlein = 'Prépa Optique en temps plein',
    VieActive = 'Vie active',
  }
}
