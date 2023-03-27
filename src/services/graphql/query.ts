import { gql } from "@apollo/client";
export const vreel = `
vreel {
  id
  members {

    header
    hidden
    id
    parent
    position
    slides {
      
      isRef
      cta_position
      company_name
      is_employee
      job_description
      profile_picture
      author
      contact_visible
      content_type
      cta1 {
        link_type
        link_header
        link_url
        owner_id
      }
      advanced {
        background_audio_source
        background_audio_url
        header

        isDarkMode
        link_type
        logoUrl
      }
      cta2 {
        link_header
        link_url
        owner_id
        link_type
      }
      cta3 {
        link_header
        link_url
        owner_id
        link_type
      }
      cta4 {
        link_header
        link_type
        link_url
        owner_id
      }
      desktop {
        background_audio_uri
        content_type
        start_time
        stop_time
        uri
      }
      id
      logo_desktop
      logo_mobile
      logo_uri
      logo_visible
      metadata {
        created
        size
      }
      mobile {
        start_time
        content_type
        background_audio_uri
        stop_time
        uri
      }
      muted
      parent
      qrcode_visible
      slide_location
      share_visible
      title {
        description
        header
      }
      uri
    }
  }
  display_options {
    audio_type
    background_audio
    default_logo
    default_logo_height
    sections {
      header {
        uri
        family
      }
      button {
        uri
        family
      }
      title{
        family
        uri
      }
      description {
        uri 
        family
      }
    }
    slide {
      description {
        family
        uri
      }
      title {
        uri
        family
      }
      button {
        family
        uri
      }
    }
  
  }
  elements{
    simple_links{
      id
      parent
      header
      hidden
      position
      links{
        id
        hidden
        position
        thumbnail
        link_header
        url
        link_type
        tag
      }
    }
    videos{
      header
      hidden
      videos {
      id
      hidden
      parent
      position
      video_header
      description
      mobile {
        start_time
        stop_time
        background_audio_uri
        uri
        content_type
      }
      desktop {
        start_time
        stop_time
        background_audio_uri
        uri
        content_type
      }
      cta1 {
        link_header
        link_type
        link_url
      }
      cta2 {
        link_header
        link_type
        link_url
      }
    }
    }

    socials{
      socials
{
platform
}
    }
  }
  author
  logo_uri
      gallery {
        header
        position
        id
         slides {
          cta_position
          isRef
    id
    slide_location
    active
    logo_uri
    logo_visible
    content_type
    uri
    title {
      header
      description
    }
    advanced {
      header
      logoUrl
      isDarkMode
      collaboration_requests {
        id
        status
        username
      }
      background_audio_source
      background_audio_url
    }
    mobile {
      start_time
      stop_time
      background_audio_uri
      uri
      content_type
    }
    desktop {
      start_time
      stop_time
      background_audio_uri
      uri
      content_type
    }
    cta1 {
      link_header
      link_type
      link_url
    }
    cta2 {
      link_header
      link_type
      link_url
    }
  }
      }
  simple_links {
    id
    background_color
    parent
    header
    hidden
    position
    links {
      id
      parent
      hidden
      position
      thumbnail
      link_header
      url
      link_type
    }
  }
  socials {
    id
    parent
    background_color
    position
    hidden
    header
    socials {
      id
      position
      platform
      username
    }
  }
  gallery{
    id
    parent
    position
    hidden
    header
    slides {
      cta_position
    id
    isRef
    slide_location
    active
    muted
    logo_uri
    logo_visible
    content_type
    uri
    title {
      header
      description
    }
    advanced {
      header
      logoUrl
      isDarkMode
      background_audio_source
      background_audio_url
    }
    mobile {
      start_time
      stop_time
      background_audio_uri
      uri
      content_type
    }
    desktop {
      start_time
      stop_time
      background_audio_uri
      uri
      content_type
    }
    cta1 {
      link_header
      link_type
      link_url
    }
    cta2 {
      link_header
      link_type
      link_url
    }
  }
  }
  embed {
    id
    header
    position
    background_color
    embed_code
  }
  video_gallery {
    id
    parent
    position
    hidden
    header
    videos {
      id
      hidden
      parent
      position
      video_header
      description
      mobile {
        start_time
        stop_time
        background_audio_uri
        uri
        content_type
      }
      desktop {
        start_time
        stop_time
        background_audio_uri
        uri
        content_type
      }
      cta1 {
        link_header
        link_type
        link_url
      }
      cta2 {
        link_header
        link_type
        link_url
      }
    }
  }
  slides {
    id
    muted
    cta_position
    slide_location
    active
    logo_uri
    logo_visible
    contact_visible
    qrcode_visible
    share_visible
    content_type
    uri
    isRef
    title {
      header
      description
    }
    advanced {
      header
      logoUrl
      logoHeight
      isDarkMode
      background_audio_source
      background_audio_url
    }
    mobile {
      start_time
      stop_time
      background_audio_uri
      uri
      content_type
    }
    desktop {
      start_time
      stop_time
      background_audio_uri
      uri
      content_type
    }
    cta1 {
      link_header
      link_type
      link_url
    }
    cta2 {
      link_header
      link_type
      link_url
    }
    cta3 {
      link_header
      link_type
      link_url
    }
    cta4 {
      link_header
      link_type
      link_url
    }
  }

  }
`;
export const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const GET_SECTIONS_PREVIEW = gql`
  query sectionsPreview($id: String!, $metadata: DetailedRequest!) {
    page(id: $id, metadata: $metadata) {
      id
      simple_links {
        position
        hidden
        id
        header
      }
      gallery {
        position
        hidden
        id
        header
      }
      embed {
        position
        id
        header
      }
      members {
        position
        hidden
        id
        header
      }
      socials {
        position

        id
        header
      }
    }
  }
`;

export const GET_USER_BY_TOKEN = gql`
  query User($token: String!, $metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata ) {
      id
      email
      username
      pages {
        id
        name
      }
      companyName
      title
      profilePicture
      v_email
      prefix
      suffix
      files {
        file_count
      }
      ${vreel}
    }
  }
`;

export const GET_USER_BY_USER_NAME = gql`
  query User($username: String!, $metadata: DetailedRequest!) {
    username(username: $username, metadata: $metadata) {
      id
      email
      username
      companyName
      title
      profilePicture
      files {
        file_count
      }
      ${vreel}
    }
  }
`;

export const GET_ENTERPRISE_EMPLOYEES = gql`
  query employees($token: String!, $metadata: DetailedRequest!) {
    enterpriseByToken(token: $token, metadata: $metadata) {
      id
      default_portrait
      default_landscape
      employees {
        id
        title
        profilePicture
        v_email
        first_name
        last_name
        email
        pagesRef
        selfPortraitImage
        selfLandscapeImage
        account_type
        companyName
        username
        middle_initial
        prefix
        suffix
        linkedinUrl
        home_phone
        cell_phone
        work_phone
        business_address
        home_address
        website
        landing_page
        job_title
        note
        employee_metadata {
          contact_visible
          share_visible
          qrcode_visible
          cta_position
          cta1 {
            link_header
            link_type
            link_url
          }
          cta2 {
            link_header
            link_type
            link_url
          }
          cta3 {
            link_header
            link_url
            link_type
          }
          cta4 {
            link_header
            link_type
            link_url
          }
          display_profile_image
          description
          job_description
        }
      }
    }
  }
`;

export const GET_ENTERPRISE_EMPLOYEE = gql`
  query enterprise($enterpriseName: String!, $employeeId: String!, $key: String) {
    enterpiseEmployee(
      enterpriseName: $enterpriseName
      employeeId: $employeeId
      key: $key
    ) {
      companyName
      default_landscape
      default_portrait
      employee {
        employee_metadata {
          contact_visible
          share_visible
          qrcode_visible
          cta_position
          cta1 {
            link_header
            link_type
            link_url
          }
          cta2 {
            link_header
            link_type
            link_url
          }
          cta3 {
            link_header
            link_url
            link_type
          }
          cta4 {
            link_header
            link_type
            link_url
          }
          display_profile_image
          description
          job_description
        }
        id
        title
        profilePicture
        first_name
        last_name
        email
        selfPortraitImage
        selfLandscapeImage
        account_type
        companyName
        username
        middle_initial
        prefix
        suffix
        linkedinUrl
        home_phone
        cell_phone
        work_phone
        business_address
        home_address
        website
        landing_page
        job_title
        note
      }
      ${vreel}
    }
  }
`;

export const GET_ACCOUNT_DATA = gql`
  query User($token: String!, $metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      id
      title
      profilePicture
      first_name
      last_name
      email
      v_email
      selfPortraitImage
      selfLandscapeImage
      account_type
      companyName
      username
      middle_initial
      prefix
      suffix
      linkedinUrl
      home_phone
      cell_phone
      work_phone
      business_address
      home_address
      website
      landing_page
      job_title
      note
    }
  }
`;

export const GET_DISPLAY_OPTIONS = gql`
  query displayOption($token: String!, $metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      id
      vreel {
        display_options {
          background_audio
          default_logo
          audio_type
        }
      }
    }
  }
`;

export const GET_DISPLAY_OPTIONS_BY_PAGE = gql`
  query page($id: String!, $metadata: DetailedRequest!) {
    page(id: $id, metadata: $metadata) {
      display_options {
        audio_type
        background_audio
        default_logo
        default_logo_height
        sections {
          header {
            uri
            family
          }
          button {
            uri
            family
          }
          title {
            family
            uri
          }
          description {
            uri
            family
          }
        }
        slide {
          description {
            family
            uri
          }
          title {
            uri
            family
          }
          button {
            family
            uri
          }
        }
      }
    }
  }
`;

export const GET_PAGES_BY_TOKEN = gql`
  query displayOption($token: String!, $metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      id
      pages {
        id
        name
      }
    }
  }
`;

export const GET_PAGE = gql`
  query page($id: String!, $metadata: DetailedRequest!) {
    page(id: $id, metadata: $metadata) {
      id
      collab_slides {
        isRef
        collabRef
        author
        id
        slide_location
        title {
          header
        }
      }
      members {
        header
        hidden
        id
        parent
        position
        slides {
          cta_position
          job_description
          is_employee
          isRef
          profile_picture
          company_name
          author
          contact_visible
          is_employee
          profile_picture
          # job_description
          content_type
          cta1 {
            link_type
            link_header
            link_url
            owner_id
          }
          advanced {
            background_audio_source
            background_audio_url
            header
            collaboration_requests {
              id
              status
              username
            }
            isDarkMode
            link_type
            logoUrl
          }
          cta2 {
            link_header
            link_url
            owner_id
            link_type
          }
          cta3 {
            link_header
            link_url
            owner_id
            link_type
          }
          cta4 {
            link_header
            link_type
            link_url
            owner_id
          }
          desktop {
            background_audio_uri
            content_type
            start_time
            stop_time
            uri
          }
          id
          logo_desktop
          logo_mobile
          logo_uri
          logo_visible
          metadata {
            created
            size
          }
          mobile {
            start_time
            content_type
            background_audio_uri
            stop_time
            uri
          }
          muted
          parent
          qrcode_visible
          slide_location
          share_visible
          title {
            description
            header
          }
          uri
        }
      }
      display_options {
        default_logo_height
        audio_type
        background_audio
        default_logo
        sections {
          header {
            uri
            family
          }
          button {
            uri
            family
          }
          title {
            family
            uri
          }
          description {
            uri
            family
          }
        }
        slide {
          description {
            family
            uri
          }
          title {
            uri
            family
          }
          button {
            family
            uri
          }
        }
      }
      elements {
        simple_links {
          id
          parent
          header
          hidden
          position
          links {
            id
            hidden
            position
            thumbnail
            link_header
            url
            link_type
            tag
          }
        }
        videos {
          header
          hidden
          videos {
            id
            hidden
            parent
            position
            video_header
            description
            mobile {
              start_time
              stop_time
              background_audio_uri
              uri
              content_type
            }
            desktop {
              start_time
              stop_time
              background_audio_uri
              uri
              content_type
            }
            cta1 {
              link_header
              link_type
              link_url
            }
            cta2 {
              link_header
              link_type
              link_url
            }
          }
        }

        socials {
          background_color

          socials {
            platform
          }
        }
      }
      author
      logo_uri
      gallery {
        header
        position
        id
        slides {
          cta_position
          isRef
          id
          slide_location
          active
          logo_uri
          logo_visible
          content_type
          uri
          title {
            header
            description
          }
          advanced {
            header
            logoUrl
            isDarkMode
            background_audio_source
            background_audio_url
          }
          mobile {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          desktop {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          cta1 {
            link_header
            link_type
            link_url
          }
          cta2 {
            link_header
            link_type
            link_url
          }
        }
      }
      simple_links {
        id
        parent
        header
        hidden
        position
        background_color

        links {
          id
          parent
          hidden
          position
          thumbnail
          link_header
          url
          link_type
        }
      }
      socials {
        id
        parent
        position
        position
        hidden
        header
        socials {
          id
          position
          platform
          username
        }
      }
      gallery {
        id
        parent
        position
        hidden
        header
        slides {
          transition_duration
          cta_position
          isRef
          id
          slide_location
          muted
          active
          logo_uri
          logo_visible
          content_type
          uri
          title {
            header
            description
          }
          advanced {
            header
            logoUrl
            isDarkMode
            background_audio_source
            background_audio_url
          }
          mobile {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          desktop {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          cta1 {
            link_header
            link_type
            link_url
          }
          cta2 {
            link_header
            link_type
            link_url
          }
        }
      }
      embed {
        id
        header
        position
        background_color
        embed_code
      }
      video_gallery {
        id
        parent
        position
        hidden
        header
        videos {
          id
          hidden
          parent
          position
          video_header
          description
          mobile {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          desktop {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          cta1 {
            link_header
            link_type
            link_url
          }
          cta2 {
            link_header
            link_type
            link_url
          }
        }
      }
      slides {
        transition_duration
        id
        cta_position
        slide_location
        muted
        active
        logo_uri
        logo_visible
        content_type
        uri
        isRef
        title {
          header
          description
        }
        advanced {
          logoHeight
          collaboration_requests {
            id
            status
            username
          }
          info {
            description
            header
          }
          header
          logoUrl
          isDarkMode
          background_audio_source
          background_audio_url
        }
        mobile {
          start_time
          stop_time
          background_audio_uri
          uri
          content_type
        }
        desktop {
          start_time
          stop_time
          background_audio_uri
          uri
          content_type
        }
        cta1 {
          link_header
          link_type
          link_url
        }
        cta2 {
          link_header
          link_type
          link_url
        }
        cta3 {
          link_header
          link_type
          link_url
        }
        cta4 {
          link_header
          link_type
          link_url
        }
        contact_visible
        qrcode_visible
        share_visible
      }
    }
  }
`;

export const GET_USER_PAGES = gql`
  query pages($token: String!, $metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      id
      pages {
        id
        name
      }
    }
  }
`;

export const GET_EMPLOYEES_PREVIEW = gql`
  query enterprise($token: String!, $metadata: DetailedRequest!) {
    enterpriseByToken(token: $token, metadata: $metadata) {
      employees {
        id
        first_name
        last_name
      }
    }
  }
`;
export const GET_PAGE_INVITATION = gql`
  query PageInvitations($token: String!, $pageId: String!) {
    pageInvitations(token: $token, pageId: $pageId) {
      invite_duration
      secured
      invites {
        id
        page
        email
      }
    }
  }
`;

export const GET_PAGE_SECURITY = gql`
  query PageIsSecured($id: String!, $context: String!) {
    pageIsSecure(id: $id, context: $context) {
      Secured
      PageId
      PageLogo
      SecuredImage
    }
  }
`;

export const GET_SOCIALS_SECTION = gql`
  query Socials($id: String!, $token: String!) {
    socials(id: $id, token: $token) {
      background_color
      header
      hidden
      id
      parent
      position
      socials {
        id
        platform
        position
        username
      }
    }
  }
`;
export const GET_GALLERY_SECTION = gql`
  query Gallery($id: String!, $token: String!) {
    gallery(id: $id, token: $token) {
      header
      hidden
      id
      parent
      position
      type
      slides {
        id
        author
        collabRef
        isRef
        active
        muted
        parent
        content_type
        logo_uri
        logo_visible
        logo_desktop
        logo_mobile
        company_name
        is_employee
        contact_visible
        share_visible
        qrcode_visible
        profile_picture
        job_description
        uri
        slide_location
        transition_duration

        title {
          header
          description
        }
        metadata {
          created
          size
        }
        mobile {
          start_time
          stop_time
          background_audio_uri
          content_type
          uri
        }
        desktop {
          start_time
          stop_time
          background_audio_uri
          content_type
          uri
        }
        cta1 {
          owner_id
          link_header
          link_type
          link_url
        }
        cta2 {
          owner_id
          link_header
          link_type
          link_url
        }
        cta3 {
          owner_id
          link_header
          link_type
          link_url
        }
        cta4 {
          owner_id
          link_header
          link_type
          link_url
        }
        cta_position
        advanced {
          info {
            header
            description
            collaborators
            credits
            background_audio_credit
            music_credit
          }
          header
          link_type
          logoUrl
          collaboration_requests {
            id
            username
          }
          isDarkMode
          background_audio_source
          background_audio_url
        }
        info {
          title
          description
          collaborators
          credits {
            credit_type
            accredited_id
          }
        }
      }
    }
  }
`;
export const GET_SIMPLE_LINKS_SECTION = gql`
  query Simple_links($id: String!, $token: String!) {
    simple_links(id: $id, token: $token) {
      header
      background_color
      links {
        url
        hidden
        id
        link_header
        link_type
        parent
        position
        tag
        thumbnail
      }
      hidden
      id
      parent
      position
    }
  }
`;

export const GET_EMBED = gql`
  query Embed($id: String!, $token: String!) {
    embed(id: $id, token: $token) {
      background_color
      embed_code
      header
      id
      parent
      position
    }
  }
`;

export const GET_MEMBERS_SECTION = gql`
  query Members($id: String!, $token: String!) {
    members(id: $id, token: $token) {
      id
      type
      parent
      header
      position
      hidden
      slides {
        id
        author
      }
    }
  }
`;
