interface FlamelinkEmulators {
  firestorePID: string
  firebasePID: string
}

declare namespace NodeJS {
  interface Global {
    __flamelink_emulators: FlamelinkEmulators
  }
}
