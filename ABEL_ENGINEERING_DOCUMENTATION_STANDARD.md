# Abel Engineering Documentation & Portal Standard v1.0

## Tool Folder

Each Abel Engineering tool should contain:

```text
Tool-Repository/
├── index.html
├── README.md
├── tool-manifest.json
└── docs/
    ├── quick-start/
    ├── work-instructions/
    ├── reference/
    ├── limitations/
    └── data/
```

## Manifest

`tool-manifest.json` is the authoritative navigation index for the portal. The portal should not scan directories and should not hard-code document content.

## Document Naming

`TYPE-AE-TOOL-###_Description.md`

## Portal Interaction

Every tool card should provide:

- **Open Tool** — bypasses documentation
- **Tool Information** — overview + registered documentation
- **Repository** — source access

## Visual Standard

Use the Abel Engineering dark/purple interface, clean gear/lightning mark, and faded purple section dividers between major workflow regions.

## Documentation Ownership

Supporting documents live with the tool they describe so software and documentation can be version-controlled together.
